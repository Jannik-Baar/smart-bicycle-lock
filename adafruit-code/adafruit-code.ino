#include <SPI.h>
#include <MFRC522.h>
#include <Stepper.h>

#define RST_PIN         9          // Configurable, see typical pin layout above
#define SS_PIN          22         // Configurable, see typical pin layout above

MFRC522 mfrc522(SS_PIN, RST_PIN);  // Create MFRC522 instance
int SPU = 2048;
Stepper Motor(SPU, 13,11,12,10);
bool currentLockState = false;
String authorizedUIDs[] = {
  "8E 86 D2 AA"
};

bool isAuthorized(String uid);

void setup() {
	Serial.begin(9600);		// Initialize serial communications with the PC
	while (!Serial);		// Do nothing if no serial port is opened (added for Arduinos based on ATMEGA32U4)
	SPI.begin();			// Init SPI bus
  Motor.setSpeed(5);
	mfrc522.PCD_Init();		// Init MFRC522
	delay(4);				// Optional delay. Some board do need more time after init to be ready, see Readme
	mfrc522.PCD_DumpVersionToSerial();	// Show details of PCD - MFRC522 Card Reader details
	Serial.println(F("Scan PICC to see UID, SAK, type, and data blocks..."));
}

void loop() {
	// Reset the loop if no new card present on the sensor/reader. This saves the entire process when idle.
	if ( ! mfrc522.PICC_IsNewCardPresent()) {
		return;
	}

	// Select one of the cards
	if ( ! mfrc522.PICC_ReadCardSerial()) {
		return;
	}

  //Show UID on serial monitor
  Serial.print("UID tag :");
  String content= "";
  byte letter;
  for (byte i = 0; i < mfrc522.uid.size; i++) 
  {
     Serial.print(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " ");
     Serial.print(mfrc522.uid.uidByte[i], HEX);
     content.concat(String(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " "));
     content.concat(String(mfrc522.uid.uidByte[i], HEX));
  }
  Serial.println();
  // Serial.print("Message : ");
  // content.toUpperCase();

  Serial.println(content.substring(1));
  if (isAuthorized(content.substring(1))) {
    Serial.println("Authorized access");
    Serial.println();
    // mfrc522.PICC_DumpToSerial(&(mfrc522.uid));
    if (currentLockState)  {
      Serial.println("Locking...");
      Motor.step(-1 * 4096);
    }
    else {
      Serial.println("Unlocking...");
      Motor.step(4096);
    }

    currentLockState = !currentLockState;
    delay(3000);
  }
  else{
    Serial.println("Access denied.");
    Serial.println();
    // mfrc522.PICC_DumpToSerial(&(mfrc522.uid));
    delay(3000);
  }
}

bool isAuthorized(String uid) {
  for (size_t i = 0; i < sizeof(authorizedUIDs) / sizeof(authorizedUIDs[0]); i++) {
    if (uid == authorizedUIDs[i]) {
      return true;
    }
  }
  return false;
}
