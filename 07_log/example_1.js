// Adicione o módulo Winston com uma require()função.
const winston = require('winston')

// Crie um objeto de configuração
const logConfiguration = {
//transports - Destino de saída de log
  'transports': [
    //terminal
    new winston.transports.Console(
      {
        //levels - Indicam a prioridade do log
        // emerg: 0, alert: 1,, crit: 2, error: 3, warning: 4, notice: 5, info: 6, debug: 7
        level: 'info', //valor padrão
        //format - Formato do registro do log
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.label({label: 'myapp'}),
          winston.format.json()
        ),
      }
    ),
    //arquivo
    new winston.transports.File(
      {
        filename: 'logs/error.log',
        //Grave todos os logs com nível warn ou menor para error.log, ou seja emerg, alert, crit e error
        level: 'error'
      }
    )
  ]
}

//crie um looger
const logger = winston.createLogger(logConfiguration)


logger.info({'Teste de log de informação': {'nome': 1}})
logger.error({'Teste de log de erro': {'nome': 1}})