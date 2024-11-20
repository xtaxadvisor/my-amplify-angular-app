const runCommand = (command) => {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${error.message}`);
                reject(error);
            }
            if (stderr) {
                console.error(`Stderr: ${stderr}`);
            }
            console.log(`Stdout: ${stdout}`);
            resolve(stdout);
        });
    });
};

// Build and deploy process
const buildAndDeploy = async () => {
    try {
        console.log("Starting build...");
        await runCommand("npm run build -- --output-path=dist/amplify-angular-template");
        console.log("Build completed successfully!");

        console.log("Deploying with Amplify...");
        await runCommand("amplify publish");
        console.log("Deployment completed successfully!");
    } catch (error) {
        console.error("Build and deploy failed:", error);
    }
};

// Execute the build and deploy process
buildAndDeploy();

