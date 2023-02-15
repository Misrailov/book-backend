const axios = require("axios");
const config = require("config");
const supertest = require("supertest");
const { PrismaClient, } = require('@prisma/client');


const createServer = require("../src/createServer");
const { getKnex } = require("../src/data");

const fetchAccessToken = async () => {
  const params = new URLSearchParams();
  params.append("grant_type", "password");
  params.append("username", config.get("auth.testUser.username"));
  params.append("password", config.get("auth.testUser.password"));
  params.append("scope", "openid profile email offline_access");
  params.append("client_id", config.get("auth.clientId"));
  params.append("client_secret", config.get("auth.clientSecret"));
  params.append("audience", config.get("auth.audience"));

  const response = await fetch(config.get("auth.tokenUrl"), {
    method: "POST",
    body: params,
  });
  const json = await response.json();
  return json.access_token;
};

/**
 * Ensure a server instance is running.
 *
 * @param {Function} setter - Setter which gives access to the supertest agent and the Knex instance
 *
 * @returns {supertest.SuperAgentTest} A supertest agent.
 */
const withServer = (setter) => {
  let server;

  beforeAll(async () => {
    server = await createServer();
    const token = await fetchAccessToken();

    setter({
      knex: getKnex(),
      request: supertest(server.getApp().callback()),
      authHeader: `Bearer ${token}`,
      prisma: new PrismaClient(),
    });
  });

  afterAll(async () => {
    // Cleanup resources!
    await server.stop();
  });
};

module.exports = {
  fetchAccessToken,
  withServer,
};