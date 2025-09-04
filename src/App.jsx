import React from "react"

import Logo from "./logo.png"
import Icon from "./icon.png"

import './App.css';

import styled from "styled-components"

const Base = 10

const Scales = {
  Line: 0.1 * Base,
  Thin: 1 * Base,
  Regular: 2 * Base,
  Medium: 4 * Base,
  Large: 8 * Base,
  Super: 16 * Base,
}

const Palette = {
  Primary: "#2bc041",
  Secondary: "#232425",
  White: "#fff",
  Black: "#000",
}

const View = styled.div``

const Text = styled.p`
  font-family: Poppins;
  padding: 0;
  margin: 0;
`

const UI = {
  View,
  Text,
  Image: styled.img``,
  Space: Object.assign({}, ...Object.keys(Scales).map(key => ({ [key]: (
    styled.div`
      padding: ${Scales[key]}px;
    `
  ) }))),
  Typography: {
    ...Object.assign({}, ...Object.keys(Scales).map(scale => ({ [scale]: {
      Text: styled(Text)`
      font-size: ${Scales[scale]}px;
      `
    } }))),
    Bold: {
      ...Object.assign({}, ...Object.keys(Scales).map(scale => ({ [scale]: {
        Text: styled(Text)`
        font-size: ${Scales[scale]}px;
        font-weight: 500;
        `
      } }))),
    }
  },
  Round: Object.assign({}, ...(
    Object.keys(Scales).map(key => ({
      [key]: styled.div`
              border-radius: ${Scales[key]}px;
              overflow: hidden;
          `
    }))
  )),
  Flex: {
    Start: styled.div`
          justify-content: flex-start;
          align-items: flex-start;
          display: flex;
          flex: 1;
      `,
    Center: styled.div`
          justify-content: center;
          align-items: center;
          display: flex;
          flex: 1;
      `,
    End: styled.div`
          justify-content: flex-end;
          align-items: flex-end;
          display: flex;
          flex: 1;
      `,
    Full: styled.div`
          display: flex;
          flex: 1;
      `,
    Zero: styled.div`
          display: flex;
          flex: 0;
      `,
    Row: styled(View)`
          flex-direction: row;
          display: flex;
          flex: 1;
      `,
    Column: styled(View)`
          flex-direction: column;
          display: flex;
          flex: 1;
      `,
  }
}


const Components = {
  Container: (props = {}) => {
    return (
      <UI.View {...props} style={{ maxWidth: "1200px", margin: "auto" }} />
    )
  },
  Button: (props = {}) => {
    return (
      <UI.Round.Super style={{
        backgroundColor: "#2b7adf"
      }}>
        <UI.Space.Thin style={{ paddingLeft: Scales.Medium, paddingRight: Scales.Medium }}>
          <UI.Text style={{ color: Palette.White }}>
            {props.children}
          </UI.Text>
        </UI.Space.Thin>
      </UI.Round.Super>
    )
  },
  Table: {
    Container: UI.Space.Regular,
    Body: UI.Flex.Column,
    Header: (props = {}) => {
      return (
        <UI.Flex.Row style={{
          borderBottom: "1px solid",
          borderColor: Palette.Primary,
        }}>
          {props.children}
        </UI.Flex.Row>
      )
    },
    Row: (props = {}) => {
      return (
        <UI.Flex.Row style={{
          ...(!props.lastRow && {
            borderBottom: "1px solid",
            borderColor: "#ccc",
          })
        }}>
          {props.children}
        </UI.Flex.Row>
      )
    },
    Cell: (props = {}) => {
      const { data = {}, index, header, lastRow } = props
      return (
        <UI.Flex.Full
          style={{
            ...(data.marked == true && {
              backgroundColor: "#eee",
              ...(header && {
                borderTopLeftRadius: Scales.Thin,
                borderTopRightRadius: Scales.Thin,
              }),
              ...(lastRow && {
                borderBottomLeftRadius: Scales.Thin,
                borderBottomRightRadius: Scales.Thin,
              }),
            }),
            ...(!!index && {
              justifyContent: "center"
            })
          }}
        >
          <Kit.UI.Space.Regular>
            {typeof data.value == "string" && (
              <UI.Text style={{
                wordBreak: "break-word",
                ...(!!index && {
                  textAlign: "center"
                }),
                ...((header && !index) && {
                  color: Palette.Primary
                }),
                ...((data.marked) && {
                  color: Palette.Primary,
                  fontWeight: "bold",
                }),
              }}>
                {data.value}
              </UI.Text>
            )}
            {typeof data.value == "object" && (
              <>
                {data.value}
              </>
            )}
          </Kit.UI.Space.Regular> 
        </UI.Flex.Full>
      )
    }
  }
}

const Kit = {
  UI,
  Components,
}

function App() {
  const header = [
    {
      value: "Benefícios inclusos no seu pacote",
      marked: false,
    },
    {
      value: <Kit.UI.Image src={Logo} width="32pt" />,
      marked: true,
    },
    {
      value: "Média de Mercado",
      marked: false,
    },
  ]
  const rows = [
    [
      {
        value: "Certificado Digital",
      },
      {
        value: "incluso",
        marked: true,
      },
      {
        value: "R$ 200/ano",
      },
    ],
    [
      {
        value: "Abertura de empresa, 100% digital",
      },
      {
        value: "incluso",
        marked: true,
      },
      {
        value: "R$ 700/ano",
      },
    ],
    [
      {
        value: "Contabilidade Consultiva",
      },
      {
        value: "incluso",
        marked: true,
      },
      {
        value: "R$ 5.880,00/mês",
      },
    ],
    [
      {
        value: "Conta PJ gratuita, digital e integrada à sua contabilidade",
      },
      {
        value: "incluso",
        marked: true,
      },
      {
        value: "R$ 756,00/ano",
      },
    ],
    [
      {
        value: "Atendimento personalizado por telefone e WhatsApp a partir do plano de entrada",
      },
      {
        value: "incluso",
        marked: true,
      },
      {
        value: "R$ 1.920/ano",
      },
    ],
  ]
  return (
    <Kit.Components.Container>
      <Kit.UI.Flex.Center>
        <Kit.UI.Space.Regular>
          <Kit.UI.Typography.Bold.Medium.Text style={{ textAlign: "center" }}>
            {"Por que a "}
            <span style={{ color: Palette.Primary }}>
              Contabilidade.com
              </span>
            {" é a melhor opção {cidade}?"}
          </Kit.UI.Typography.Bold.Medium.Text>
        </Kit.UI.Space.Regular>
      </Kit.UI.Flex.Center>
      <Kit.Components.Table.Container>
        <Kit.Components.Table.Header>
          {header.map((item, index) => (
            <React.Fragment key={`header[${index}]`}>
              <Kit.UI.Flex.Full style={{ flex: !index ? 3 : 1 }}>
                <Kit.Components.Table.Cell
                  data={item}
                  header
                  index={index}
                />
              </Kit.UI.Flex.Full>
            </React.Fragment>
          ))}
        </Kit.Components.Table.Header>
        <Kit.Components.Table.Body>
          {rows.map((itemRow, indexRow) => (
            <React.Fragment key={`row[${indexRow}]`}>
              <Kit.Components.Table.Row lastRow={(indexRow + 1) == rows.length}>
                {itemRow.map((itemCell, indexCell) => (
                  <React.Fragment key={`rowCell[${indexRow}][${indexCell}]`}>
                    <Kit.UI.Flex.Full style={{ flex: !indexCell ? 3 : 1 }}>
                      <Kit.Components.Table.Cell
                        data={itemCell}
                        index={indexCell}
                        lastRow={(indexRow + 1) == rows.length}
                      />
                    </Kit.UI.Flex.Full>
                  </React.Fragment>
                ))}
              </Kit.Components.Table.Row>
            </React.Fragment>
          ))}
        </Kit.Components.Table.Body>
      </Kit.Components.Table.Container>
      <Kit.UI.Flex.Center>
        <Kit.UI.Space.Regular>
          <Kit.UI.Flex.Row>
              
            <Kit.UI.Image src={Icon} width="32pt" />
            <Kit.UI.Typography.Regular.Text style={{ textAlign: "center", color: Palette.Primary }}>
              Uma economia média de <strong>R$ 9.456/ano</strong>
            </Kit.UI.Typography.Regular.Text>
          </Kit.UI.Flex.Row>
        </Kit.UI.Space.Regular>
      </Kit.UI.Flex.Center>
      <Kit.UI.Flex.Center>
        <Kit.UI.Space.Regular>
          <Kit.Components.Button>
            Abrir empresa grátis
          </Kit.Components.Button>
        </Kit.UI.Space.Regular>
      </Kit.UI.Flex.Center>
    </Kit.Components.Container>
  );
}

export default App;
