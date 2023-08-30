import bcrypt from 'bcrypt';

export default async function (req, res) {
    const { password, hash } = req.body

    const result = await bcrypt.compare(password, hash);

    return res.status(200).json({ status: result ? 'Match' : 'Not Match' });
}