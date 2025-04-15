import formidable from 'formidable';
import { firstValues } from "formidable/src/helpers/firstValues.js";
import * as yup from "yup";
import { object, string, number, date, InferType } from 'yup';
import prisma from '../../../lib/prisma_lib';
import { Prisma } from '@prisma/client';

export default async function handler(req, res) {
	const {
		query: { id },
		method,
	} = req;

    switch ( method ) {
        case "GET":
            try {
                const tag = await prisma.tag.findUnique({
                    where: {
                        id: parseInt(id)
                    }
                })
                res.status(200).send({ status: "got tag "+id });
            } catch (e){
                res.status(400).send({ status: "could not get tag: " + e });
                return;
            }
        case "DELETE":
            try {
                const deleteTag = await prisma.tag.delete({
                    where: {
                        id: parseInt(id)
                    },
                })

				return res.status(200).json({
					success: true,
					data: { id },
				});

            } catch (e) {
                res.status(400).send({ status: "could not delete tag: " + e });
                return;
            }
        default:
            res.status(400).send({ status: "invalid request?" });
    }
}