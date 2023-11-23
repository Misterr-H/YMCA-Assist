import type { NextApiRequest, NextApiResponse } from 'next'
import openaiFunction from "@/util/openaiFunction";

type ResponseData = {
    message: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    const { question } = req.query;
    let answer = await openaiFunction(question as string);
    // truncate first space from answer
    res.setHeader('Content-Type', 'application/json')
    answer = answer?.replace(/^ /, '');
    res.status(200).json({ message: answer as string })
}
