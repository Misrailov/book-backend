

const {withServer } = require('../helpers');
describe("bookCollections", () =>{
    let request;
    let knex;
    let authHeader;
    let prisma;
    withServer(({knex:k,request: r,authHeader:a,prisma:p}) =>{
        knex = k;
        request = r;
        authHeader = a;
        prisma = p;
    })
    const url = "/api/bookc";
    console.log(authHeader)

  
    
    describe("GET /api/bookc", () =>{
        beforeAll(async () =>{
            await prisma.bookCollection.createMany({
                data:[
                    
                    {
                    ...data.bookCollections[0]
                },
            {
                ...data.bookCollections[1]
            }
        ]
            })

            
        })
        afterAll(async () =>{
        await prisma.bookCollection.delete({
            where:{
                id:data.bookCollections[0].id
            }
        })
   
        });

        test("it should 200 and return all collections", async() =>{
            const response  = await request.get(url).set("Authorization", authHeader); 
            expect(response.status).toBe(200);
            expect([...response.body].length).toBe(8);

            
        })
    })
    describe("GET /api/bookc/:id", () =>{
        beforeAll(async () =>{
            await prisma.bookCollection.create({
                data:{
                    ...data.bookCollections[0]
                },
            })

            
        })
        afterAll(async () =>{
        await prisma.bookCollection.delete({
            where:{
                id:data.bookCollections[0].id
            }
        })
   
        });

        test("it should 200 and return a collection with id 1", async() =>{
           
            const response  = await request.get(url + `/1`).set("Authorization", authHeader); 
            expect(response.status).toBe(200);
            const allItems= await request.get(url).set("Authorization", authHeader); 
            expect(response.body.title).toEqual(data.bookCollections.title);
            expect((allItems.body[(response.body).length-1]).title).toEqual(data.bookCollections[0].title);
            
        })
    })

    describe ("POST /api/bookc", () =>{
        beforeAll(async () =>{
            await prisma.bookCollection.create({
                data:{
                    ...data.bookCollections[0]
                }
            })
        })
        afterAll(async () =>{
            await prisma.bookCollection.delete({
                where:{
                    id:data.bookCollections[0].id
                }
            })
            await prisma.bookCollection.delete({
                where:{
                    id:data.bookCollections[1].id
                }
            })
        })
        test("it should 201 and return the created collection", async() =>{
            const response = await request.post(url).send({
                ...data.bookCollections[1]
            }).set("Authorization", authHeader)
            expect(response.status).toBe(201);
            expect(response.body.title).toEqual(data.bookCollections[1].title);
            expect(response.body.personId).toEqual(data.bookCollections[1].personId);
            expect(response.body.description).toEqual(data.bookCollections[1].description);
            expect(response.body.imgLink).toEqual(data.bookCollections[1].imgLink);
        })

    })

    describe("PUT /api/bookc/:id", () =>{
        beforeAll(async () =>{
            await prisma.bookCollection.create({
                data:{
                    ...data.bookCollections[0]
                }
            })
        })
        afterAll(async () =>{
            await prisma.bookCollection.delete({
                where:{
                    id:data.bookCollections[1].id
                }
            })

        })
        test("it should 200 and return the updated bookCollections", async() =>{
            const response = await request.put(url + "/1").send({
                ...data.bookCollections[1]

            }).set("Authorization", authHeader)
            expect(response.status).toBe(200);
            expect(response.body.email).toEqual(data.bookCollections[1].email);
            expect(response.body.firstName).toEqual(data.bookCollections[1].firstName);
            expect(response.body.lastName).toEqual(data.bookCollections[1].lastName);
            expect(response.body.auth0Id).toEqual(data.bookCollections[1].auth0Id);
        })
    })
    describe("DELETE /api/bookc/:id", () =>{
        beforeAll(async () =>{
            await prisma.bookCollection.create({
                data:{
                    ...data.bookCollections[0]
                }
            })
        })
        afterAll(async () =>{
            await prisma.bookCollection.delete({
                where:{
                    id:data.bookCollections[0].id
                }
            })

        })
        test("it should 204(no content) and return nothing", async() =>{
            const response = await request.delete(url + "/1").set("Authorization", authHeader)
            expect(response.status).toBe(204);
            expect(response.body).toEqual({});
        })
    })
})

const data = {
    persons:[
        {
            id:1,
            email: "prismajohndoe@gmail.com",
       
            firstName: "John",
           
            lastName: "Doe",
            auth0Id:"authsadsdasdasd"
        
        },
        {
            email: "prismamusaisrailov@gmail.com",
            firstName: "Musa",
          
            lastName: "Israilov",
            auth0Id:"authsadsdasdasd12323"

        }
    ],
    bookCollections:[
        {   id:1,
            title: "prismaCollection Musa1",
            personId: 3,
            imgLink:"Cool image",
            description:"Cool description"

        },
        {   id:2,
            title: "prismaCollection Musa2",
            personId: 3,
            imgLink:"Cool image",
            description:"Cool description"

        }
    ]
}