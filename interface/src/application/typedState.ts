/**
 * To strictly type all accessors and writers, remove
 *
 * [messageID: string]: any
 *
 * And replace with your entire state shape after codecs have decoded them.
 */

export enum MSGID {
  FIXTURES = 'fixture',
}

declare global {
  interface ElectricUIDeveloperState {
    [messageID: string]: any

    [MSGID.FIXTURES]: [AputureLS] | [AputureLS, AputureLS]
  }
}


export enum MODE_SELECT {
  MODE_MANUAL = 0,
  MODE_FX = 128,
}

export enum FXMODE {
  FX_PAPARAZZI = 0,
  FX_FIREWORKS = 20,
  FX_FAULT_BULB = 40,
  FX_LIGHTNING = 60,
  FX_TV = 80,
  FX_PULSING = 100,
  FX_STROBE = 120,
  FX_EXPLOSION = 140,
  FX_UNDEFINED = 160,
}

export enum FXLIGHTINGMODE {
  FXLIGHTNING_START = 0,
  FXLIGHTNING_SINGLE = 1,
  FXLIGHTNING_CYCLE = 128,
}

export enum FXEXPLOSIONMODE {
  FXEXPLOSION_START = 0,
  FXEXPLOSION_SINGLE = 1,
  FXEXPLOSION_UNDEFINED = 128,
}

export type AputureLS = {
  intensity: number
  mode: MODE_SELECT
  fxSelect: FXMODE
  fxFrequency: number
  fxTrigger: FXLIGHTINGMODE | FXEXPLOSIONMODE
}


// This exports these types into the dependency tree.
export {}


