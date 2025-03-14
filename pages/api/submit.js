import { NextRequest } from "next/server";
//const multer = require('multer');

import formidable from 'formidable';
import { firstValues } from "formidable/src/helpers/firstValues.js";
import * as yup from "yup";
import { object, string, number, date, InferType } from 'yup';
import prisma from '../../lib/prisma_lib';
import { Prisma } from '@prisma/client';

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    // const log = await prisma.log.create({
    //     data: {
    //         title: req.body.title,
    //         description: req.body.description,
    //         tags: req.body.tags,
    //     },
    //   })
    // console.log(log)
    // const formData = await req.formData();

    // const form = new formidable.IncomingForm();
    // form.uploadDir = "./";
    // form.keepExtensions = true;


    // const data = req.body
    // // const title = await createItem(data)
    // res.status(200).json({ data });
    // form.parse(req, (err, fields, files) => {
    //     console.log(err, fields, files);
    // });
    // ...

    const form = formidable({ multiples: true });
    const formData = new Promise((resolve, reject) => {
        form.parse(req, async (err, fields, files) => {
        if (err) {
            reject("error");
        }
        //resolve({ fields, files });
        //https://github.com/node-formidable/formidable/issues/876
        // fields come in as array of strings instead of just a string, to avoid type error based on different user input
        resolve({ fields: firstValues(form, fields), files });
        });
    });
    try {
        const { fields, files } = await formData;
        ///fields.json()
        //res.status(200).send({ fields });
        //const fields2 = { name: 'jimmy'}
        //res.status(200).send({ status: "submitted" });
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
}

// let formSchema = yup.object().shape({
//     name: yup.string().required(),
// });

// let formSchema2 = object().shape({
//     name: yup.string().required(),
// });

let formSchema = object({
    title: string().required(),
    description: string(),
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

async function saveFormData(fields, files) {
    // save to persistent data store
    try {
        const log = await prisma.log.create({
            data: {
                userId: 1,
                title: fields.title,
                description: fields.description
            }
        })
    } catch(e){
        throw e
    }
}

async function saveFormData2(fields, files) {
    // save to persistent data store
    // try {
    //     await prisma.log.create({
    //         title: fields.name,
    //         description: fields.description
    //     })
    // } catch(e){
    //     return false
    // }
    try {
        const user = await prisma.user.create({
            data: {
            name: 'Emmit',
            email: 'demeraldhunter@gmail.com',
            },
        })
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (e.code === 'P2002') {
            //   console.log(
            //     'There is a unique constraint violation, a new user cannot be created with this email'
            //   )
                throw e + ": user already exists"
                //return false
            }
        }
        throw e
    }
      //console.log(user)
}

// export async function POST(request) {
//     // const formData = await request.formData();
//     // const title = formData.get('title');
//     // console.log(title)
//     // return NextResponse.json({
//     //   message: 'Logged in successfully'
//     // });
//     res.status(200).json({ text: 'Hello' });
//   }