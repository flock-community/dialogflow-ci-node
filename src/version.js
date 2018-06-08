SUPPORTED_VERSIONS = ['v1', 'v2'];

const getVersion = () => {
    const version = process.env['VERSION'];
    if (!SUPPORTED_VERSIONS.includes(version))
        throw new Error(`Version not supported: ${version}. Supported versions are: ${SUPPORTED_VERSIONS.join(', ')}`);
    return version;
}

module.exports = getVersion;