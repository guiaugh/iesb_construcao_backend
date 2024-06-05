const yup = require('yup')

const schema = yup.object().shape({
    nome: yup
        .string('campo precisa ser um texto')
        .required('campo obrigatório'),
    cargo: yup
        .string('campo precisa ser um texto')
        .required('campo obrigatório'),
    email: yup
        .string('campo precisa ser um texto')
        .email('E-mail inválido')
        .required('campo obrigatório'),
    telefone: yup
        .string('campo precisa ser um texto')
        .required('campo obrigatório'),
    data_contratacao: yup
        .date('Data inválida')
        .required('campo obrigatório'),
})

function funcionarioValidador(req, res, next) {
    schema
        .validate(req.body, { abortEarly: false })
        .then(() => next())
        .catch(err => {
            console.log(err)
            const errors = err.inner.map(e => {
                const erro = {
                    campo: e.path,
                    erros: e.errors
                }
                return erro
            })
            res.status(400).json(
                {
                    mensagem: "Falha na validação dos campos",
                    erros: errors
                }
            )
        })
}

module.exports = {
    funcionarioValidador
}