const getServerInfo = () => {
    return {
        os: process.platform,
        nodeVersion: process.version,
        currentDirectory: process.cwd(),
        processId: process.pid,
        memoryUsage: JSON.stringify(process.memoryUsage(), null, 2),
        entryArguments: process.argv
    }
}

export default getServerInfo;