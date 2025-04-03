import formidable from 'formidable';
import { firstValues } from "formidable/src/helpers/firstValues.js";
import * as yup from "yup";
import { object, string, number, date, InferType, array } from 'yup';
import prisma from '../../../lib/prisma_lib';
import { Prisma } from '@prisma/client';

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    const { method } = req;
    switch (method) {
		case "POST":
            const form = formidable({ multiples: true });
            let tags = []; // for saveformdata function to be able to use the tags array
            const formData = new Promise((resolve, reject) => {
                form.parse(req, async (err, fields, files) => {
                if (err) {
                    reject("error");
                }
                //res.status(200).send({ fields: fields.tags });
                tags = fields.tags
                // res.status(200).send({ fields: tags });
                // resolve({ fields, files });
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
                //const fields2 = { name: 'jimmy'}
                //res.status(200).send({ fields });
                const isValid = await validateFromData(fields, files);
                if (!isValid) throw Error("invalid form schema");
            
                try {
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

        //const tags = ["what", "the", "fuck"] // this works
        //const {tags, fields} = fields
        

        const log = await prisma.log.create({
            data: {
                userId: 1,
                title: fields.title,
                description: fields.description,
                //tags: fields.tags,
                //tags: [fields.tags]

                // tags: {
                //     connectOrCreate: [
                //         { create: { name: 'tag1' }, where: { name: 'tag1' } },
                //         { create: { name: 'tag2' }, where: { name: 'tag2' } },
                //     ],
                //   },
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
