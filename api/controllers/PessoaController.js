const database = require('../models')

class PessoaController {
    static async pegaTodasAsPessoas(requisicao, resposta) {
        try {
            const todasAsPessoas = await database.Pessoas.findAll()
            return resposta.status(200).json(todasAsPessoas)
        } catch (error) {
            return resposta.status(500).json(error.message)
        }
    }

    static async pegaUmaPessoa (requisicao, resposta) {
        const { id } = requisicao.params
        try {
            const umaPessoa = await database.Pessoas.findOne( {
                 where: { id: Number(id) 
                 }
            })
            return resposta.status(200).json(umaPessoa)
        } catch (error) {
            return resposta.status(500).json(error.message)
        }
    }

    static async criaPessoa (requisicao, resposta) {
        const novaPessoa = requisicao.body
        try {
            const novaPessoaCriada = await database.Pessoas.create(novaPessoa)
            return resposta.status(200).json(novaPessoaCriada)
        } catch (error) {
            return resposta.status(500).json(error.message)
        }
    }

    static async atualizaPessoa (requisicao, resposta) {
        const { id } = requisicao.params
        const novasInfos = requisicao.body 
        try {
            await database.Pessoas.update(novasInfos, { where: { id: Number(id) } })
            const pessoaAtualizada = await database.Pessoas.findOne( { where: { id: Number(id) } })
            return resposta.status(200).json(pessoaAtualizada)
        } catch (error) {
            return resposta.status(500).json(error.message)
        }
    }

    static async apagaPessoa (requisicao, resposta) {
        const { id } = requisicao.params
        try {
            await database.Pessoas.destroy({ where: { id: Number(id) }})
            return resposta.status(200).json({ mensagem: `id ${id} deletado com sucesso!` })

        } catch (error) {
            return resposta.status(500).json(error.message)
        }
    }

    //http://localhost:3000/pessoas/:estudanteId/matriculas/:matriculaId
    static async pegaUmaMatricula (requisicao, resposta) {
        const { estudanteId, matriculaId } = requisicao.params
        try {
            const umaMatricula = await database.Matriculas.findOne( {
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            })
            return resposta.status(200).json(umaMatricula)
        } catch (error) {
            return resposta.status(500).json(error.message)
        }
    }

    static async criaMatricula (requisicao, resposta) {
        const { estudanteId } = requisicao.params
        const novaMatricula = { ...requisicao.body, estudante_id: Number(estudanteId) }
        try {
            const novaMatriculaCriada = await database.Matriculas.create(novaMatricula)
            return resposta.status(200).json(novaMatriculaCriada)
        } catch (error) {
            return resposta.status(500).json(error.message)
        }
    }

    static async atualizaMatricula (requisicao, resposta) {
        const { estudanteId, matriculaId } = requisicao.params
        const novasInfos = requisicao.body 
        try {
            await database.Matriculas.update(novasInfos, { 
                where: { 
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId) 
                } })
            const matriculaAtualizada = await database.Matriculas.findOne( { where: { id: Number(matriculaId) } })
            return resposta.status(200).json(matriculaAtualizada)
        } catch (error) {
            return resposta.status(500).json(error.message)
        }
    }

    static async apagaMatricula (requisicao, resposta) {
        const { estudanteId, matriculaId } = requisicao.params
        try {
            await database.Matriculas.destroy({ where: { id: Number(matriculaId) }})
      return resposta.status(200).json({ mensagem: `id ${matriculaId} deletado com sucesso!` })
        } catch (error) {
            return resposta.status(500).json(error.message)
        }
    }
}

module.exports = PessoaController