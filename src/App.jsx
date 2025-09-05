import React from "react"

import Logo from "./logo.png"
import Icon from "./icon.png"

import * as SwiperJS from "swiper/react"
import * as SwiperModules from "swiper/modules"

import 'swiper/css';

import './App.css';

import styled from "styled-components"

const Modules = {
  SwiperJS,
  SwiperModules,
}

const Base = 10

const Scales = {
  Zero: 0 * Base,
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
    Space: {
      ...Object.assign({}, ...Object.keys(Scales).map(key => (
        ({ [key]: styled(View)`
          padding: ${Scales[key]}px;
          flex: 1;
          display: flex;
          flex-direction: column;
        ` })
      ))),
      Horizontal: {
        ...Object.assign({}, ...Object.keys(Scales).map(key => (
          ({
            [key]: styled(View)`
        padding-left: ${Scales[key]}px;
        padding-right: ${Scales[key]}px;
        flex: 1;
        display: flex;
        flex-direction: column;
    ` })
        ))),
      },
      Vertical: {
        ...Object.assign({}, ...Object.keys(Scales).map(key => (
          ({
            [key]: styled(View)`
        padding-top: ${Scales[key]}px;
        padding-bottom: ${Scales[key]}px;
        flex: 1;
        display: flex;
        flex-direction: column;
    ` })
        ))),
      }
    }
  }
}


const Components = {
  Container: (props = {}) => {
    return (
      <UI.View {...props} style={{ maxWidth: "1200px", margin: "auto" }} />
    )
  },
  Button: (propsRaw = {}) => {
    const { style, ...props } = propsRaw
    return (
      <Kit.UI.View style={{
        ...style,
        cursor: "pointer",
      }} {...props}>
        <UI.Round.Super style={{
          backgroundColor: "#2b7adf"
        }}>
          <UI.Space.Thin style={{ paddingLeft: Scales.Medium, paddingRight: Scales.Medium }}>
            <UI.Text style={{ color: Palette.White }}>
              {props.children}
            </UI.Text>
          </UI.Space.Thin>
        </UI.Round.Super>
      </Kit.UI.View>
    )
  },
  ButtonBig: (propsRaw = {}) => {
    const { style, styleHover, onPress, ...props } = propsRaw
    const Component = styled.div`
      &:hover {
        backgroundColor: red;
      }
    `
    return (
      <Component
        style={{
          ...style,
          cursor: "pointer",
        }}
      onClick={onPress} {...props}>
        <UI.Round.Zero style={{
          backgroundColor: "#2b7adf"
        }}>
          <UI.Space.Regular style={{ paddingLeft: Scales.Medium, paddingRight: Scales.Medium }}>
            <UI.Typography.Medium.Text style={{ color: Palette.White }}>
              {props.children}
            </UI.Typography.Medium.Text>
          </UI.Space.Regular>
        </UI.Round.Zero>
      </Component>
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
  Modules,
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
  const Content = {
    offers: [
      {
        color: "maroon"
      },
      {
        color: "gold"
      },
      {
        color: "teal"
      },
    ],
    planos: [
      {
        name: "Plano PJ",
        priceLast: 240,
        price: 199,
        colorSecondary: Palette.White,
        colorPrimary: Palette.Primary,
        detail1: "Faturamento Mensal: Ideal até 50 mil*",
        detail2: "Notas fiscais: até 10 notas/mês",
        services: [
          {
            label: "Abertura Gratuita",
            icon: "confirm",
          },
          {
            label: "Certificado digital e-CNPJ",
            icon: "confirm",
          },
          {
            label: "Plataforma com emissor e gestão financeira",
            icon: "confirm",
          },
          {
            label: "Contabilidade, pró-labore e entrega das obrigações com o governo",
            icon: "confirm",
          },
          {
            label: "Atendimento WhatsApp, e-mail, telefone e video",
            icon: "confirm",
          },
        ],
        button: "Comece grátis",
      },
      {
        name: "Plano PJ Plus",
        priceLast: 320,
        price: 249,
        colorSecondary: Palette.Primary,
        colorPrimary: "#eee",
        detail1: "Faturamento Mensal: Ideal até 100 mil*",
        detail2: "Notas fiscais: até 50 notas/mês",
        services: [
          {
            label: "Tudo que contém o Plano PJ",
            icon: "confirm",
          },
          {
            label: "Entrega do IRPF de 1 sócio(a)",
            icon: "plus",
          },
          {
            label: "Relatórios contábeis mensais",
            icon: "plus",
          },
          {
            label: "Multibenefícios (i)",
            icon: "plus",
          },
        ],
        button: "Comece grátis",
      },
      {
        name: "Plano PJ VIP",
        priceLast: 500,
        price: 329,
        colorSecondary: Palette.Primary,
        colorPrimary: "#eee",
        detail1: "Faturamento Mensal: Ideal até 100 mil*",
        detail2: "Notas fiscais: até 100 notas/mês",
        services: [
          {
            label: "Tudo que contém o Plano PJ e Plus",
            icon: "confirm",
          },
          {
            label: "Gestão financeira completa (i)",
            icon: "plus",
          },
          {
            label: "Pró-labore até 2 sócios(as) grátis",
            icon: "plus",
          },
          {
            label: "Pagamento de contas",
            icon: "plus",
          },
          {
            label: "Distribuição de lucros",
            icon: "plus",
          },
        ],
        button: "Comece grátis",
      },
    ]
  }
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
      <Kit.UI.Flex.Full>

        <Kit.Modules.SwiperJS.Swiper
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
          direction="horizontal"
          style={{ height: "100%", width: "100%", overflow: "visible" }}
          breakpoints={{
            100: {
              slidesPerView: 1
            },
            800: {
              slidesPerView: 1
            } 
          }}
          scrollbar
          mousewheel
          nested
          //loop
          grabCursor
          //freeMode
          modules={[
            Kit.Modules.SwiperModules.Scrollbar,
            Kit.Modules.SwiperModules.Mousewheel,
            Kit.Modules.SwiperModules.FreeMode,
            Kit.Modules.SwiperModules.Parallax,
          ]}
        >
          {Content.planos.map((item, index) => (
            <React.Fragment key={`offer[${index}]`}>
              <Kit.Modules.SwiperJS.SwiperSlide style={{ display: "flex" }}>
                
                <Kit.UI.View style={{
                  height: "800px",
                  //backgroundColor: "#eee",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  }}>
                  
                  <Kit.UI.Flex.Space.Regular>
                    <Kit.UI.View style={{
                      backgroundColor: item.colorPrimary,
                      flex: 1,
                      display: "flex"
                    }}>
                      <Kit.UI.Flex.Space.Regular>
                        <Kit.UI.Flex.Column>
                          <Kit.UI.Typography.Large.Text style={{ color: item.colorSecondary }}>
                            {item.name}
                          </Kit.UI.Typography.Large.Text>
                          <Kit.UI.Typography.Regular.Text style={{ color: item.colorSecondary }}>
                            {item.detail1}
                          </Kit.UI.Typography.Regular.Text>
                          <Kit.UI.Typography.Regular.Text style={{ color: item.colorSecondary }}>
                            {item.detail2}
                          </Kit.UI.Typography.Regular.Text>
                          <Kit.UI.Flex.Full>

                            <Kit.UI.Flex.Space.Regular>
                              {item.services.map((itemService, indexService) => (
                                <React.Fragment key={`services[${index}][${indexService}]`}>
                                  <Kit.UI.Space.Thin>

                                    <Kit.UI.Round.Zero style={{
                                      boxShadow: `5px 5px #555`
                                    }}>
                                      <Kit.UI.View style={{backgroundColor: item.colorSecondary }}>
                                        <Kit.UI.Space.Thin>

                                          <Kit.UI.Typography.Regular.Text style={{ color: item.colorPrimary }}>
                                            {itemService.label}
                                          </Kit.UI.Typography.Regular.Text>
                                        </Kit.UI.Space.Thin>

                                      </Kit.UI.View>
                                    </Kit.UI.Round.Zero>
                                  </Kit.UI.Space.Thin>
                                </React.Fragment>
                              ))}
                            </Kit.UI.Flex.Space.Regular>
                          </Kit.UI.Flex.Full>
                          <Kit.UI.View>
                            <Kit.UI.Flex.Row>
                              <Kit.UI.Flex.Center>

                                <Kit.Components.ButtonBig style={{
                                  boxShadow: `5px 5px #555`
                                }}
                                onPress={alert}>
                                  {item.button}
                                </Kit.Components.ButtonBig>
                              </Kit.UI.Flex.Center>
                              <Kit.UI.Flex.End>

                                <Kit.UI.Typography.Regular.Text style={{ color: item.colorSecondary }}>
                                  de <span>R${item.priceLast}</span> por <span style={{ fontSize: Scales.Large}}>R${item.price}</span>/mensal
                                </Kit.UI.Typography.Regular.Text>
                              </Kit.UI.Flex.End>
                            </Kit.UI.Flex.Row>
                          </Kit.UI.View>
                        </Kit.UI.Flex.Column>
                      </Kit.UI.Flex.Space.Regular>
                    </Kit.UI.View>
                  </Kit.UI.Flex.Space.Regular>
                  
                </Kit.UI.View>

              </Kit.Modules.SwiperJS.SwiperSlide>
            </React.Fragment>
          ))}

        </Kit.Modules.SwiperJS.Swiper>
      </Kit.UI.Flex.Full>
    </Kit.Components.Container>
  );
}

export default App;
