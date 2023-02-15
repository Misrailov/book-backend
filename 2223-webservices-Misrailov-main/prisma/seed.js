const { PrismaClient } = require('@prisma/client');
const prisma  =new PrismaClient();

async function main(){

    await prisma.person.upsert({
        where:{email:'alice@prisma.io'},
        update:{},
        create: {
            email:'m.israsdsdilov24@gmail.com',
            firstName:"Musa",
            lastName:"Israilov",
            auth0Id: "auth-sdasd2sd31321ssdsdTEST123",
            bookCollections: {
                create:{
                    title: "Favourite Books",
                    books:{
                        create:{
                            bookId: "ppjUtAEACAAJ",
                            progress: 15,
                            review:5,
                            isFavorite:true,
                            isRead: false,
                            title:"The Lord of the Rings",
                            subtitle:"The Fellowship of the Ring",
                            imgLink:"http://books.google.com/books/content?id=ppjUtAEACAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
                            authors:"J.R.R. Tolkien"
                        }
                    }
                }
            }
        }
    })

  const noah=  await prisma.person.upsert({
        where:{email:'alice@prisma.io'},
        update:{},
        create: {
            email:'n.wallecanTest@gmail.com',
            auth0Id: "auth-sdasds",
            firstName:"Noah",
            lastName:"Wallecan",
            auth0Id: "auths-sdassdadd2313s21sT21332EST",
            bookCollections: {
                create:
                [
                {
                    title: "Favourite Books",
                    books:{
                        create:{
                            bookId: "ppjUtAEACAAJ",
                            progress: 15,
                            review:5,
                            isFavorite:true,
                            isRead: false,
                            title:"The Lord of the Rings",
                            subtitle:"The Fellowship of the Ring",
                            imgLink:"http://books.google.com/books/content?id=ppjUtAEACAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
                            authors:"J.R.R. Tolkien"
                            
                        }
                    }
                },
                {
                    title: "Best Fantasy Books",
                    books:{
                        create:{
                            bookId: "ppjUtAEACAA",
                            progress: 0,
                            review:5,
                            isFavorite:false,
                            isRead: true,
                            title:"The Lord of the Rings",
                            subtitle:"The Fellowship of the Ring",
                            imgLink:"http://books.google.com/books/content?id=ppjUtAEACAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
                            authors:"J.R.R. Tolkien"
                        }
                    }
                }
            ]
            }
        }
    })
    console.log({noah})
}
main()
.then(async () =>{
    await prisma.$disconnect()
})
.catch(async (e) => {
console.error(e)
await prisma.$disconnect()
process.exit(1)
})