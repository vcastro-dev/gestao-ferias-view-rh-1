import * as React from "react";
import type { IGestaoFeriasViewRhProps } from "./IGestaoFeriasViewRhProps";
import {
  DetailsList,
  IColumn,
  IStyle,
  IconButton,
  Stack,
  Text,
} from "@fluentui/react";
import {
  SolicitacaoFerias,
  useSolicitacaoFerias,
} from "../hooks/useSolicitacoesFerias";

// const orderById = (a: SolicitacaoFerias, b: SolicitacaoFerias) => {
//   return a.Id - b.Id;
// };

// const groupSolicitacaoFeirasByColaboradorId = (
//   solicitacaoFeriasItems: SolicitacaoFerias[]
// ): { [key: number]: SolicitacaoFerias[] } => {
//   return solicitacaoFeriasItems.reduce((acc, solicitacaoFeriasItem) => {
//     const key = solicitacaoFeriasItem.ColaboradorId;

//     if (!acc[key]) {
//       acc[key] = [];
//     }

//     acc[key].push(solicitacaoFeriasItem);
//     acc[key].sort(orderById);

//     return acc;
//   }, {} as { [key: number]: SolicitacaoFerias[] });
// };

export default function GestaoFeriasViewRh(
  props: IGestaoFeriasViewRhProps
): JSX.Element {
  //const { colaboradores } = props;
  const solicitacaoFeriasItems = useSolicitacaoFerias().getItems({});
  // const groupedSolicitacaoFeriasItems = React.useMemo(() => {
  //   return groupSolicitacaoFeirasByColaboradorId(solicitacaoFeriasItems);
  // }, [solicitacaoFeriasItems]);

  const columns: IColumn[] = React.useMemo(() => {
    return [
      {
        key: "column1",
        name: "Status",
        minWidth: 100,
        maxWidth: 150,
        onRender: (item: SolicitacaoFerias) => {
          const periodoAquisitivo = new Date(item.PeriodoAquisitivo);
          const saldoDias = new Date().getTime() - periodoAquisitivo.getTime();
          let saldoDiasInDays =
            Math.floor(saldoDias / (1000 * 3600 * 24)) / 365;
          saldoDiasInDays = Math.floor(saldoDiasInDays);
          saldoDiasInDays *= 30;

          const fimPeriodoAtual = new Date(item.PeriodoAquisitivo);
          fimPeriodoAtual.setDate(fimPeriodoAtual.getDate() + 365);

          const fimPeriodoAtualMaiorQueHoje =
            fimPeriodoAtual.getTime() > new Date().getTime();

          const userItems = solicitacaoFeriasItems.filter(
            (solicitacaoFeriasItem) =>
              solicitacaoFeriasItem.ColaboradorId === item.ColaboradorId || ""
          );

          const anoAtual = new Date().getFullYear();
          const hasItemPeriodoAtual = userItems.find(
            (userItem) =>
              new Date(userItem.PeriodoAquisitivo).getFullYear() === anoAtual
          );

          let style: IStyle = {
            borderRadius: "1rem",
            padding: "0.25rem 0.5rem",
            margin: "0.5rem",
            height: "1.5rem",
          };

          if (saldoDiasInDays <= 0) {
            style = {
              ...style,
              color: "#437406",
              backgroundColor: "#CFFFB8",
            };
            return <Text styles={{ root: style }}>Regularizado</Text>;
          } else if (saldoDiasInDays === 30 && hasItemPeriodoAtual) {
            style = {
              ...style,
              color: "#8F6200",
              backgroundColor: "#FFEBC0",
            };
            return <Text styles={{ root: style }}>Agendado</Text>;
          } else if (saldoDiasInDays === 30 && !fimPeriodoAtualMaiorQueHoje) {
            style = {
              ...style,
              color: "#8F6200",
              backgroundColor: "#FFEBC0",
            };
            return <Text styles={{ root: style }}>Pendente agendamento</Text>;
          } else {
            style = {
              ...style,
              color: "#b80022",
              backgroundColor: "#f6d4db",
            };
            return <Text styles={{ root: style }}>Atrasado</Text>;
          }
        },
      },
      {
        key: "column2",
        name: "Nome do Colaborador",
        fieldName: "Title",
        minWidth: 100,
        maxWidth: 150,
        onRender: (item: SolicitacaoFerias) => {
          return <span>{item.Colaborador?.Title || ""}</span>;
        },
      },

      {
        key: "column3",
        name: "Data de início do período aquisitivo",
        fieldName: "InicioPeriodoAtual",
        minWidth: 100,
        maxWidth: 150,
        onRender: (item: SolicitacaoFerias) => {
          return (
            <span>{new Date(item.PeriodoAquisitivo).toLocaleDateString()}</span>
          );
        },
      },

      {
        key: "column4",
        name: "Data de fim do período aquisitivo",
        fieldName: "FimPeriodoAtual",
        minWidth: 100,
        maxWidth: 150,
        onRender: (item: SolicitacaoFerias) => {
          const fimPeriodoAtual = new Date(item.PeriodoAquisitivo);
          fimPeriodoAtual.setDate(fimPeriodoAtual.getDate() + 365);

          return <span>{fimPeriodoAtual.toLocaleDateString()}</span>;
        },
      },
      {
        key: "column5",
        name: "Data limite para agendamento",
        fieldName: "DataLimiteAgendarFerias",
        minWidth: 100,
        maxWidth: 150,
        onRender: (item: SolicitacaoFerias) => {
          const dataLimiteAgendarFerias = new Date(item.PeriodoAquisitivo);
          dataLimiteAgendarFerias.setDate(
            dataLimiteAgendarFerias.getDate() + 320
          );
          return (
            <span>
              {new Date(dataLimiteAgendarFerias).toLocaleDateString()}
            </span>
          );
        },
      },
      {
        key: "column6",
        name: "Data limite para sair de férias",
        minWidth: 100,
        maxWidth: 100,
        onRender: (item: SolicitacaoFerias) => {
          const dataLimiteSairFerias = new Date(item.PeriodoAquisitivo);
          dataLimiteSairFerias.setDate(
            dataLimiteSairFerias.getDate() + 365 * 2 - 1
          );

          return (
            <span>{new Date(dataLimiteSairFerias).toLocaleDateString()}</span>
          );
        },
      },
      {
        key: "column7",
        name: "Saldo de dias",
        fieldName: "SaldoDias",
        minWidth: 100,
        maxWidth: 100,
        onRender: (item: SolicitacaoFerias) => {
          const periodoAquisitivo = new Date(item.PeriodoAquisitivo);
          const saldoDias = new Date().getTime() - periodoAquisitivo.getTime();
          let saldoDiasInDays =
            Math.floor(saldoDias / (1000 * 3600 * 24)) / 365;
          saldoDiasInDays = Math.floor(saldoDiasInDays);
          saldoDiasInDays *= 30;

          return <span>{saldoDiasInDays <= 0 ? 0 : saldoDiasInDays}</span>;
        },
      },
      {
        key: "column8",
        name: "Ver agendamento",
        minWidth: 100,
        maxWidth: 200,
        onRender: (item: SolicitacaoFerias) => {
          const userItems = solicitacaoFeriasItems.filter(
            (solicitacaoFeriasItem) =>
              solicitacaoFeriasItem.Author.Title === item.Colaborador?.Title ||
              ""
          );
          const anoAtual = new Date(item.PeriodoAquisitivo).getFullYear();
          const hasItemPeriodoAtual = userItems.find(
            (userItem) =>
              new Date(userItem.PeriodoAquisitivo).getFullYear() === anoAtual
          );

          const listId = "3f6aca03-ed95-49d7-91a4-aae35eaa1958";
          const styles = {
            fontSize: "1rem",
          };
          if (!hasItemPeriodoAtual) {
            return <></>;
          } else {
            return (
              <IconButton
                iconProps={{ iconName: "View" }}
                style={styles}
                onClick={() =>
                  window.open(
                    `/sites/newportal/_layouts/15/SPListForm.aspx?PageType=4&List=${listId}&ID=${hasItemPeriodoAtual.Id}`
                  )
                }
              />
            );
          }
        },
      },
    ];
  }, [solicitacaoFeriasItems]);

  return (
    <Stack>
      <DetailsList
        columns={columns}
        items={solicitacaoFeriasItems}
        selectionMode={0}
      />
    </Stack>
  );
}
