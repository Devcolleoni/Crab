#include "Ultrasonic.h"

int pinoTrigger = 12;
int pinoEcho = 13;
int contador = 0;
HC_SR04 sensor(pinoTrigger, pinoEcho);

void setup() {
  Serial.begin(9600);
}

void loop() {
  float distancia = sensor.distance();
  bool presenca = 1;
  bool vazio = 0;

  if (distancia > 0 && distancia < 10){
    Serial.println(presenca);
    contador += 10;
  }else {
    Serial.println(vazio);
    if (contador >= 60){
      int minutos = contador / 60;
      Serial.print("O pallet ficou: ");
      Serial.print(minutos); 
      Serial.println(" minutos!");
      contador = 0;
    }
  }

  delay(1000);
}
