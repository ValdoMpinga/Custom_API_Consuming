const { Translate } = require('@google-cloud/translate').v2;

async function  translator(text,language)
{
    const credentials = JSON.parse(process.env.CREDENTIALS)

    const translate = new Translate({ credentials: credentials, projectId: credentials.project_id })

    const [translation] = await translate.translate(text,language);

    return translation;
}

module.exports= {translator}
