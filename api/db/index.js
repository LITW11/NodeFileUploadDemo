const sql = require('mssql/msnodesqlv8');
const camelcaseObjectDeep = require('camelcase-object-deep');

const config = {
    database: 'NodeFileUploadDemo',
    server: '.\\sqlexpress',
    driver: 'msnodesqlv8',
    options: {
        trustServerCertificate: true,
        trustedConnection: true
    }
}

const addImage = async image => {
    await sql.connect(config);

    await sql.query`INSERT INTO Images (Title, ImageName) VALUES (${image.title}, ${image.name})`;

    await sql.close();
}

const getAll = async () => {
    await sql.connect(config);
    const { recordset } = await sql.query`SELECT * FROM Images`;
    return camelcaseObjectDeep(recordset);
}

module.exports = { addImage, getAll };