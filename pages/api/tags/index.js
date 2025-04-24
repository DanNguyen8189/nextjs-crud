import formidable from 'formidable';
import { firstValues } from "formidable/src/helpers/firstValues.js";
import * as yup from "yup";
import { object, string, number, date, InferType } from 'yup';
import prisma from '../../../lib/prisma_lib';
import { Prisma } from '@prisma/client';

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
                const items = await prisma.tag.findMany({
                    // select: {
                    //     id: true,
                    //     name: true, // Adjust based on your schema
                    // },
                });
                //res.status(200).json([]);
                res.status(200).json(items);
            } catch (e) {
                res.status(400).send({ status: "could not grab tag list: " + e });
                return;
            }
        case "POST":
            const form = formidable({ multiples: true });
            const formData = new Promise((resolve, reject) => {
                form.parse(req, async (err, fields, files) => {
                if (err) {
                    reject("error");
                }
                resolve({ fields: firstValues(form, fields), files });
                });
            });
            try {
                const { fields, files } = await formData;
        
                const isValid = await validateFromData(fields, files);
                if (!isValid) throw Error("invalid form schema");
            
                try {
                    await saveFormData(fields, files);
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
            res.status(400).send({ status: "invalid request?" });

    }
}


let formSchema = object({
    name: string().required(),
});

async function validateFromData(fields, files) {
    try {
        //await formSchema.validate({ ...fields, ...files });
        await formSchema.validate({ ...fields});
    return true;
    } catch (e) {
        return false;
    }
}

async function saveFormData(fields, files) {
    // save to persistent data store
    try {
        const tag = await prisma.tag.create({
            data: {
                name: fields.name,
            }
        })
    } catch(e){
        throw e
    }
}