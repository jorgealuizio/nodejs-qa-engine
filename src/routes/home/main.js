const Answer = require('./../../models/index').Answer;
const User = require('./../../models/index').User;
const Op = require('./../../models/index').Sequelize.Op;
const sequelize = require('./../../models/index').sequelize;

module.exports = async (req, res) => {
    try {
        const user = await User.findOne({ where: { username: req.params.username } });

        // buscar todas as perguntas de um usuário que tenham resposta preenchida
        const answers = await Answer.findAll({
            include: [{
                model: User,
                as: 'questionUser'
            },{
                model: User,
                as: 'answerUser'
            }],
            where: {
                answer_user_id: user.id,
                answer: {
                    [Op.ne]: '' // Op.ne -> não igual (no caso, "answer" não igual a vazio)
                }
            }
        });

        const sugestions = await User.findAll({
            limit: 4,
            order: sequelize.random(),
            where: {
                id: {
                    [Op.notIn]: [req.user.id]
                }
            }
        });

        return res.render('home/index', {
            user: req.user,
            answers,
            answerUser: user,
            sugestions
        });
    } catch (error) {
        console.log('ERROR:', error);
    }
}