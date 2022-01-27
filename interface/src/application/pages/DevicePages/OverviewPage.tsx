import {
  ChartContainer,
  LineChart,
  RealTimeDomain,
  TimeAxis,
  VerticalAxis,
} from '@electricui/components-desktop-charts'

import { Card } from '@blueprintjs/core'
import { Composition, Box } from 'atomic-layout'
import { IntervalRequester, useHardwareState } from '@electricui/components-core'
import { MessageDataSource } from '@electricui/core-timeseries'
import React from 'react'
import { RouteComponentProps } from '@reach/router'
import {
  NumberInput,
  RadioGroup,
  Slider,
  Switch,
  Dropdown,
} from '@electricui/components-desktop-blueprint'
import { FXLIGHTINGMODE, FXMODE, MODE_SELECT, MSGID } from 'src/application/typedState'



export const OverviewPage = (props: RouteComponentProps) => {
  const fixtures = useHardwareState(state => state[MSGID.FIXTURES])!

  return (
    <React.Fragment>

      <Composition gap={10} autoCols="1fr">
      {fixtures.map((light, index) => (
        <Box key={index} >
          <Card>
                Brightness
                <div style={{ margin: 20 }}>
                  <Slider
                    min={0}
                    max={255}
                    stepSize={1}
                    labelStepSize={32}
                    writer={(state, values) => {
                      state[MSGID.FIXTURES][index].intensity = values.brightness
                    }}
                  >
                    <Slider.Handle
                      name="brightness"
                      accessor={state => state[MSGID.FIXTURES][index].intensity}
                    />
                  </Slider>
                </div>
                <RadioGroup
                  accessor={state => state[MSGID.FIXTURES][index].mode}
                  writer={(state, value) => {
                    state[MSGID.FIXTURES][index].mode = value as MODE_SELECT
                  }}
                >
                  <RadioGroup.Radio
                    value={MODE_SELECT.MODE_MANUAL}
                    label="Manual"
                  />
                  <RadioGroup.Radio value={MODE_SELECT.MODE_FX} label="FX" />
                </RadioGroup>

                <Dropdown
                  accessor={state => state[MSGID.FIXTURES][index].fxSelect}
                  writer={(state, value) => {
                    state[MSGID.FIXTURES][index].fxSelect = value as FXMODE
                  }}

                  placeholder={selectedOption =>
                    selectedOption
                      ? `Mode: ${selectedOption.text}`
                      : 'Select Mode'
                  }
                >
                  <Dropdown.Option
                    value={FXMODE.FX_EXPLOSION}
                    text="Explosion"
                  />
                  <Dropdown.Option
                    value={FXMODE.FX_FAULT_BULB}
                    text="Fault Bulb"
                  />
                  <Dropdown.Option
                    value={FXMODE.FX_FIREWORKS}
                    text="Fireworks"
                  />
                  <Dropdown.Option
                    value={FXMODE.FX_PAPARAZZI}
                    text="Paparazzi"
                  />
                  <Dropdown.Option value={FXMODE.FX_LIGHTNING} text="Lightning" />
                  <Dropdown.Option value={FXMODE.FX_PULSING} text="Pulsing" />
                  <Dropdown.Option value={FXMODE.FX_STROBE} text="Strobe" />
                  <Dropdown.Option value={FXMODE.FX_TV} text="TV" />
                </Dropdown>

                <div style={{ margin: 20 }}>
                  <Slider
                    min={0}
                    max={200}
                    stepSize={20}
                    labelStepSize={20}
                    labelRenderer={(val: number) => (val >= 200)?`R`:`${Math.round(val /20)}`}
                                        writer={(state, values) => {
                      state[MSGID.FIXTURES][index].fxFrequency = values.speed
                    }}
                  >
                    <Slider.Handle
                      name="speed"
                      accessor={state => state[MSGID.FIXTURES][index].fxFrequency}
                    />
                  </Slider>
                </div>

                <RadioGroup
                  accessor={state => state[MSGID.FIXTURES][index].fxTrigger}
                  writer={(state, value) => {
                    state[MSGID.FIXTURES][index].fxTrigger = value as FXLIGHTINGMODE
                  }}
                >
                  <RadioGroup.Radio
                    value={FXLIGHTINGMODE.FXLIGHTNING_START}
                    label="Start"
                  />
                                    <RadioGroup.Radio
                    value={FXLIGHTINGMODE.FXLIGHTNING_SINGLE}
                    label="Single"
                  />
                                    <RadioGroup.Radio
                    value={FXLIGHTINGMODE.FXLIGHTNING_CYCLE}
                    label="Cycle"
                  />
                </RadioGroup>
    
              </Card>
        </Box>
      ))}


              
      </Composition>
    </React.Fragment>
  )
}
