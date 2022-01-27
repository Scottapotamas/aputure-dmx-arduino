#include <LXSAMD21DMX.h>
#include "electricui.h"

uint8_t   led_state  = 0;
uint16_t  glow_time  = 100;
uint32_t  led_timer  = 0;

char nickname[] = "DMX Example";

typedef enum {
    MODE_MANUAL = 0,
    MODE_FX = 128,
} ModeSelect;

typedef enum {
    FX_PAPARAZZI = 0,
    FX_FIREWORKS = 20,
    FX_FAULT_BULB = 40,
    FX_LIGHTNING = 60,
    FX_TV = 80,
    FX_PULSING = 100,
    FX_STROBE = 120,
    FX_EXPLOSION = 140,
    FX_UNDEFINED = 160,
} FXMode;

typedef enum {
    FXLIGHTNING_START = 0,
    FXLIGHTNING_SINGLE = 1,
    FXLIGHTNING_CYCLE = 128,
} FXLightningMode;

typedef enum {
    FXEXPLOSION_START = 0,
    FXEXPLOSION_SINGLE = 1,
    FXEXPLOSION_UNDEFINED = 128,
} FXExplosionMode;

typedef struct {
    uint8_t intensity;
    ModeSelect mode;
    FXMode fx_select;
    uint8_t fx_frequency;
    union {
        FXLightningMode lightning;
        FXExplosionMode explosion;
    } fx_mode;
} AputureLS_t;

enum {
    LS_C300D2 = 0,
    LS_120D2,

LS_NUM_FIXTURES,  // must be last entry in enum
} LSFixtureNames;

AputureLS_t cob_fixtures[ LS_NUM_FIXTURES ] = { 0 };

void commit_aputure_to_dmx( uint8_t base_addr, AputureLS_t *light )
{
    SAMD21DMX.setSlot( base_addr,     light->intensity );
    SAMD21DMX.setSlot( base_addr + 1, light->mode );
    SAMD21DMX.setSlot( base_addr + 2, light->fx_select );
    SAMD21DMX.setSlot( base_addr + 3, light->fx_frequency );

    if( light->fx_select == FX_EXPLOSION )
    {
      SAMD21DMX.setSlot( base_addr + 4, light->fx_mode.explosion );
  }
  else
  {
      SAMD21DMX.setSlot( base_addr + 4, light->fx_mode.lightning );
  }
}


eui_message_t tracked_msgs[] = 
{
    EUI_UINT8(  "led_state",  led_state ),
    EUI_UINT16( "lit_time",   glow_time ),

    EUI_CUSTOM_ARRAY( "fixture", cob_fixtures ),

    EUI_CHAR_ARRAY( "name", nickname ),
};

eui_interface_t serial_comms = EUI_INTERFACE( &serial_write ); 

void setup()
{
    Serial1.begin( 115200 );
    eui_setup_interface( &serial_comms );
    EUI_TRACK( tracked_msgs );
    eui_setup_identifier( "dmx-eui", 7 );

    SAMD21DMX.setDirectionPin(22);
    SAMD21DMX.setMaxSlots(16);
    SAMD21DMX.startOutput();

    cob_fixtures[LS_C300D2].intensity = 0;
    cob_fixtures[LS_120D2].intensity = 0;

    led_timer = millis();
}

void loop()
{
    // Handle inbound data for UI
    while( Serial.available() > 0 )
    {  
        eui_parse( Serial.read(), &serial_comms );
    }

    // Update the light fixture
    commit_aputure_to_dmx( 1, &cob_fixtures[ LS_C300D2 ] );

    // Blink the onboard status LED
    if( millis() - led_timer >= glow_time )
    {
        led_state = !led_state;
        led_timer = millis();
        digitalWrite( LED_BUILTIN, led_state );

    }    

}

void serial_write( uint8_t *data, uint16_t len )
{
    Serial.write( data, len );
}
