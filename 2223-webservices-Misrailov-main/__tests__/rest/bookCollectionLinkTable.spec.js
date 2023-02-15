

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
    const url = "/api/bookcl";
    console.log(authHeader)

  
    
    describe("GET /api/bookc", () =>{
        beforeAll(async () =>{
            await prisma.bookCollectionLinktable.createMany({
                data:[
                    
                    {
                    ...data.books[0]
                },
            {
                ...data.books[1]
            }
        ]
            })

            
        })
        afterAll(async () =>{
        // await prisma.bookCollectionLinktable.delete({
        //     where:{
        //         id:data.books[0].id
        //     }
        })
   
        });

        test("it should 200 and return all books", async() =>{
            const response  = await request.get(url).set("Authorization", authHeader); 
            expect(response.status).toBe(200);
            expect([...response.body].length).toBe(8);

            
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
    ],
    books:[
        {
            id:1,
            bookCollectionId:3,
            title:"Cool book",
            progress:1,
            review:2,
            imgLink:"Cool image",
            subtitle:"Cool description",
            bookId:"test"

        },
        {
            id:2,
            bookCollectionId:3,
            title:"Cool book",
            progress:1,
            review:2,
            imgLink:"Cool image",
            subtitle:"Cool description",
            bookId:"test"

        },
    ]
}