import formidable from 'formidable';
import { firstValues } from "formidable/src/helpers/firstValues.js";
import { object, string } from 'yup';
import prisma from '@prisma_module/prisma.module';

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    const { method } = req;
    switch ( method ) {
        case "GET":
            try {
                const items = await prisma.log.findMany({
                    include: {
                        tags: true, // Returns all tags for all logs
                    },
                });
                //console.log(items)
                //res.status(400).send({ status: "dafuq"})
                res.status(200).json(items);
            } catch (e) {
                res.status(400).send({ status: "could not grab log list: " + e });
                return;
            }
		case "POST":
            const form = formidable({ multiples: true });
            let tags = []; // for saveformdata function to be able to use the tags array / the resolve function used below messes it up
            const formData = new Promise((resolve, reject) => {
                form.parse(req, async (err, fields, files) => {
                if (err) {
                    reject("error");
                }
                tags = fields.tags // pull the tags out before separately resolving / validating

                if (Array.isArray(tags) == false) {
                    // needed because "fields.tags" ends up being an empty object {} if no tags were added, instead of 
                    // an empty array [] as we intended
                    tags = []
                }
                // https://github.com/node-formidable/formidable/issues/876
                // fields come in as array of strings instead of just a string, to avoid type error based on different user input
                resolve({ fields: firstValues(form, fields), files });
                });
            });
            try {
                const { fields, files } = await formData;
                //const tags = formData.getAll("tags")
                ///fields.json()
                //res.status(200).send({ tags }); //TODO for testing purposes
                const isValid = await validateFromData(fields, files);
                if (!isValid) throw Error("invalid form schema");
            
                try {
                    //res.status(200).send({"HAHA":"HAHA"}); //TODO for testing purposes
                    await saveFormData(fields, tags, files);
                    res.status(200).send({ status: "submitted" });
                    return;
                } catch (e) {
                    res.status(500).send({ status: "something went wrong: " + e });
                    return;
                }
            } catch (e) {
                res.status(400).send({ status: "invalid submission" });
                return;
            }
            default:
                res.status(400).send({ status: "invalid request" });
    }
}

let formSchema = object({
    title: string().required(),
    description: string(),
    //tags: array().of(string())
});

async function validateFromData(fields, files) {
    try {
        //await formSchema.validate({ ...fields, ...files });
        await formSchema.validate({ ...fields});
        //await formSchema2.validate({ name: 'jimmy'})
    return true;
    } catch (e) {
        return false;
    }
}

async function saveFormData(fields, tags, files) {
    // save to persistent data store
    try {

        const log = await prisma.log.create({
            data: {
                userId: 1,
                title: fields.title,
                description: fields.description,
                tags: {
                    connectOrCreate: tags.map(tag => ({
                      where: { name: tag }, create:  { name: tag } 
                    }))
                }
            }
        })
    } catch(e){
        throw e
    }
}
