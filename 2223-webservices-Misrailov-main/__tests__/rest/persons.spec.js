

const {withServer } = require('../helpers');
describe("persons", () =>{
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
    const url = "/api/persons";

  
    
    describe("GET /api/persons", () =>{
        beforeAll(async () =>{
            await prisma.person.createMany({
                data:[
                    
                    {
                    ...data.persons[0]
                },
            {
                ...data.persons[1]
            }
        ]
            })

            
        })
        afterAll(async () =>{
        await prisma.person.deleteMany({
            where:{
                email:{contains:"prisma"}
            }
        })
   
        });

        test("it should 200 and return all persons", async() =>{
            const response  = await request.get(url).set("Authorization", authHeader); 
            expect(response.status).toBe(200);
            expect([...response.body].length).toBe(7); // will fail when new persons has been added

            
        })
    })
    describe("GET /api/persons/:id", () =>{
        beforeAll(async () =>{
            await prisma.person.create({
                data:{
                    ...data.persons[0]
                },
            })

            
        })
        afterAll(async () =>{
        await prisma.person.delete({
            where:{
                email:data.persons[0].email
            }
        })
   
        });

        test("it should 200 and return a person with id 1", async() =>{
           
            const response  = await request.get(url + `/1`).set("Authorization", authHeader); 
            expect(response.status).toBe(200);
            const allItems= await request.get(url).set("Authorization", authHeader); 
            expect(response.body.foundPerson.email).toEqual(data.persons[0].email);
            expect(allItems.body[0].email).toEqual(data.persons[0].email);
            
        })
    })

    describe ("POST /api/persons", () =>{
        beforeAll(async () =>{
            await prisma.person.create({
                data:{
                    ...data.persons[0]
                }
            })
        })
        afterAll(async () =>{
            await prisma.person.delete({
                where:{
                    email:data.persons[0].email
                }
            })
            await prisma.person.delete({
                where:{
                    email:data.persons[1].email
                }
            })
        })
        test("it should 201 and return the created person", async() =>{
            const response = await request.post(url).send({
                ...data.persons[1]
            }).set("Authorization", authHeader)
            expect(response.status).toBe(201);
            expect(response.body.email).toEqual(data.persons[1].email);
            expect(response.body.firstName).toEqual(data.persons[1].firstName);
            expect(response.body.lastName).toEqual(data.persons[1].lastName);
           
        })

    })

    describe("PUT /api/persons/:id", () =>{
        beforeAll(async () =>{
            await prisma.person.create({
                data:{
                    ...data.persons[0]
                }
            })
        })
        afterAll(async () =>{
            await prisma.person.delete({
                where:{
                    email:data.persons[1].email
                }
            })

        })
        test("it should 200 and return the updated person", async() =>{
            const response = await request.put(url + "/1").send({
                ...data.persons[1]

            }).set("Authorization", authHeader)
            expect(response.status).toBe(200);
            expect(response.body.email).toEqual(data.persons[1].email);
            expect(response.body.firstName).toEqual(data.persons[1].firstName);
            expect(response.body.lastName).toEqual(data.persons[1].lastName);
            // expect(response.body.auth0Id).toEqual(data.persons[1].auth0Id); will not work
        })
    })
    describe("DELETE /api/persons/:id", () =>{
        beforeAll(async () =>{
            await prisma.person.create({
                data:{
                    ...data.persons[0]
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
        {
            id:1,
            title: "Collection Musa1",
            books:[],
            personId: 1
        },
        {
            id:2,
            title: "Collection Musa2",
            books:[],
            personId: 1
        }
    ]
}
// const dataToDelete = {
//     persons:[1,2],
//     bookCollections:[1,2,3,4],
// }