const createServer = require ('./createServer');

async function main(){
    
    async function onClose(server){
        await server.stop();
        process.exit(0);

    }
    try{
        console.log('Server created');
        const server = await createServer();
        
        await server.start();
        




        process.on("SIGTERM", onClose);
        process.on("SIGQUIT", onClose);
    }catch(error){
        process.exit(-1);
    }

}


main();