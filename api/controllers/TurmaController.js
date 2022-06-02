const database = require('../models')

class TurmaController {
  static async pegaTodasAsTurmas(requisicao, resposta){
    try {
      const todasAsTurmas = await database.Turmas.findAll()
      return resposta.status(200).json(todasAsTurmas)  
    } catch (error) {
      return resposta.status(500).json(error.message)
    }
  }

  static async pegaUmaTurma(requisicao, resposta) {
    const { id } = requisicao.params
    try {
      const umaTurma = await database.Turmas.findOne( { 
        where: { 
          id: Number(id) 
        }
      })
      return resposta.status(200).json(umaTurma)
    } catch (error) {
      return resposta.status(500).json(error.message)
    }
  }

  static async criaTurma(requisicao, resposta) {
    const novaTurma = requisicao.body
    try {
      const novaTurmaCriada = await database.Turmas.create(novaTurma)
      return resposta.status(200).json(novaTurmaCriada)
    } catch (error) {
      return resposta.status(500).json(error.message)
    }
  }

  static async atualizaTurma(requisicao, resposta) {
    const { id } = requisicao.params
    const novasInfos = requisicao.body
    try {
      await database.Turmas.update(novasInfos, { where: { id: Number(id) }})
      const turmaAtualizada = await database.Turmas.findOne( { where: { id: Number(id) }})
      return resposta.status(200).json(turmaAtualizada)
    } catch (error) {
      return resposta.status(500).json(error.message)
    }
  }

  static async apagaTurma(requisicao, resposta) {
    const { id } = requisicao.params
    try {
      await database.Turmas.destroy({ where: { id: Number(id) }})
      return resposta.status(200).json({ mensagem: `id ${id} deletado com sucesso!` })

    } catch (error) {
      return resposta.status(500).json(error.message)
    }
  }

}

module.exports = TurmaController