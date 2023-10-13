import * as React from 'react';
import type { IGestaoFeriasViewRhProps } from './IGestaoFeriasViewRhProps';
import { DetailsList, IColumn, IStyle, IconButton, Stack, Text } from '@fluentui/react';
import { ControleFerias, useControleFerias } from '../hooks/useControleFerias';
import { useSolicitacaoFerias } from '../hooks/useSolicitacoesFerias';

export default function GestaoFeriasViewRh(props: IGestaoFeriasViewRhProps): JSX.Element {
  const items = useControleFerias().getItems({});
  const anoAtual = new Date().getFullYear();
  const itemsPeriodoAtual = useSolicitacaoFerias().getItems({
    filter: {
      PeriodoAquisitivo: {
        gt: `'${new Date(anoAtual, 0, 1).toISOString()}'`,
        lt: `'${new Date(anoAtual, 11, 31).toISOString()}'`
      }
    }
  });

  const columns: IColumn[] = React.useMemo(() => {
    return [
      {
        key: 'column1',
        name: 'Status',
        minWidth: 100,
        maxWidth: 150,
        onRender: (item: ControleFerias) => {
          const saldoDias = parseInt(item.SaldoDias)
          const hasItemPeriodoAtual = itemsPeriodoAtual.find((itemPeriodoAtual) => itemPeriodoAtual.Author.Title === item.NomeColaborador.NAME_EMPLOYEE)

          let style: IStyle = {
            borderRadius: '1rem',
            padding: '0.25rem 0.5rem',
            margin: '0.5rem',
            height: '1.5rem',
          }
          
          if (saldoDias <= 0) {
            style = {
              ...style,
              color: '#437406',
              backgroundColor: '#CFFFB8',                        
            }
            return <Text styles={{root: style}}>Regularizado</Text>
          }
          else if (saldoDias === 30 && hasItemPeriodoAtual) {
            style = {
              ...style,
              color: '#8F6200',
              backgroundColor: '#FFEBC0',                        
            }
            return <Text styles={{root: style}}>Agendado</Text>
          } 
          else if (saldoDias === 30 && !hasItemPeriodoAtual) {
            style = {
              ...style,
              color: '#8F6200',
              backgroundColor: '#FFEBC0',                        
            }
            return <Text styles={{root: style}}>Pendente agendamento</Text>
          }
          else{
            style = {
              ...style,
              color: '#b80022',
              backgroundColor: '#f6d4db',                        
            }
            return <Text styles={{root: style}}>Atrasado</Text>
          }
        }
      },
      {
        key: 'column2',
        name: 'Nome do Colaborador',
        fieldName: 'Title',
        minWidth: 100,
        maxWidth: 150,
        onRender: (item: ControleFerias) => {
          return <span>{item?.NomeColaborador?.NAME_EMPLOYEE}</span>
        }
      },
      
      {
        key: 'column3',
        name: 'Data de início do período aquisitivo',
        fieldName: 'InicioPeriodoAtual',
        minWidth: 100,
        maxWidth: 150,
        onRender: (item: ControleFerias) => {
          return <span>{new Date(item.InicioPeriodoAtual).toLocaleDateString()}</span>
        }
      },
      
      {
        key: 'column4',
        name: 'Data de fim do período aquisitivo',
        fieldName: 'FimPeriodoAtual',
        minWidth: 100,
        maxWidth: 150,
        onRender: (item: ControleFerias) => {
          return <span>{new Date(item.FimPeriodoAtual).toLocaleDateString()}</span>
        }
      },
      {
        key: 'column5',
        name: 'Data limite para agendamento',
        fieldName: 'DataLimiteAgendarFerias',
        minWidth: 100,
        maxWidth: 150,
        onRender: (item: ControleFerias) => {
          return <span>{new Date(item.DataLimiteAgendarFerias).toLocaleDateString()}</span>
        }
      },
      {
        key: 'column6',
        name: 'Data limite para sair de férias',
        minWidth: 100,
        maxWidth: 100,
        onRender: (item: ControleFerias) => {
          return <span>{new Date(item.DataLimiteSairFerias).toLocaleDateString()}</span>
        }
      },
      {
        key: 'column7',
        name: 'Saldo de dias',
        fieldName: 'SaldoDias',
        minWidth: 100,
        maxWidth: 100,
        onRender: (item: ControleFerias) => {
          const saldoDias = parseInt(item.SaldoDias)
          const saldoFeriasDias = saldoDias <= 0 ? 0 : saldoDias;
          return <span>{saldoFeriasDias.toFixed(0)}</span>
        }
      },
      {
        key: 'column8',
        name: 'Ver agendamento',
        minWidth: 100,
        maxWidth: 200,
        onRender: (item: ControleFerias) => {
            const hasItemPeriodoAtual = itemsPeriodoAtual.find((itemPeriodoAtual) => itemPeriodoAtual.Author.Title === item.NomeColaborador.NAME_EMPLOYEE)
            const listId = '3f6aca03-ed95-49d7-91a4-aae35eaa1958'
            const styles = {
              fontSize: '1rem'
            }
            if(!hasItemPeriodoAtual){
              return <></>
            }
            else {
              return (
                <IconButton 
                  iconProps={{iconName:"View"}} 
                  style={styles} 
                  onClick={() => window.open(`/sites/newportal/_layouts/15/SPListForm.aspx?PageType=4&List=${listId}&ID=${hasItemPeriodoAtual.Id}`)}/>
              )
            }
        }
    },
    ];
  }, [itemsPeriodoAtual]);

  return (
    <Stack>
      <DetailsList
        columns={columns}
        items={items}
        selectionMode={0}
      />
    </Stack>
  );
}