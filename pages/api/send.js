import bcrypt from 'bcrypt';

export default async function (req, res) {
    const { password } = req.body

    const hash = await bcrypt.hash(password, 10)

    return res.status(200).json({ hash });
}