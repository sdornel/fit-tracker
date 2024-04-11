import "reflect-metadata"; // Import reflect-metadata if your project uses decorators
import dataSource from "./db/data-source";

async function runMigrations() {
    try {
        await dataSource.initialize(); // Initializes data source
        console.log("Data Source has been initialized!");
        
        const migrations = await dataSource.runMigrations(); // Runs pending migrations
        console.log(`Successfully ran ${migrations.length} migration(s)!`);

        await dataSource.destroy(); // Cleanly shuts down the data source
        console.log("Data Source has been closed.");
    } catch (err) {
        console.error("Error during migration run:", err);
        process.exit(1); // Exits the process with an error code
    }
}

runMigrations();