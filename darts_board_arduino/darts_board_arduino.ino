// darts.ino

// 2枚のシート分の入出力領域を確保します
int NUM[10] = {2,3,4,5,6,7,8,9,10,11};
//int NUM[10] = {11,10,9,8,7,6,5,4,3,2};
int SDT[7]  = {A0,A1,A2,A3,A4,A5,A6};
//int SDT[7]  = {A6,A5,A4,A3,A2,A1,A0};

// 数字検出位置まとめの配列を作ります
String positions[10][2] = {{"09", "14"}, {"12", "11"}, {"05", "08"}, {"20", "16"}, {"10", "15"}, {"06", "02"}, {"13", "17"}, {"04", "03"}, {"18", "19"}, {"01", "07"} };
boolean found;
int findNum, findPos;

void setup(){
  /*
   * Arduinoのピン番号と1枚目のシート(数字検出)のピン番号を対応させ、
   * 出力モードに設定した後にLOW信号を流しておきます
   */
   
  for(int i = 0; i < 10; i++){
    //NUM[i] = i + 2;
    pinMode(NUM[i], OUTPUT);
    digitalWrite(NUM[i], LOW);
  }
  /*
   * Arduinoのピン番号と2枚目のシート(場所検出)のピン番号を対応させ、
   * 入力モードに設定しておきます
   */
  for(int i = 0; i < 7; i++){
   // SDT[i] = 14 + i;// + 14;
    pinMode(SDT[i], INPUT);
  }

  // 結果をPCに出力するためにシリアルポート9600番を解放しておきます
  Serial.begin(9600);
}

void loop(){
  for(int i = 0; i < 10; i++){
      // 全ての数字ピンに対して順番にHIGH信号を流してやります
      digitalWrite(NUM[i], HIGH);
      for(int j = 0; j < 7; j++){
        /* 
         *  この時、全ての場所ピンの入力値を精査し、
         *  HIGHが検出された場所があればそのピン番号を覚えておきます
         */
        if(digitalRead(SDT[j])){
          findNum = i;
          findPos = j;
          found = true;
        }
      }
      digitalWrite(NUM[i], LOW);
  }

  // 検出されたものがあれば、数字と場所を確定させるための条件判定を行います
  if(found){
    showHitPosition(findNum, findPos);
    found = false;
  }
}

void showHitPosition(int num, int pos){
  // 場所を検出するピンのHIGHになった点と数字を組み合わせてSerial通信で結果を出力！
  // e.g. 数字シートピン1がHIGHの時に場所シートピン1がHIGH → 出力値: "09t" (9のTriple)
  Serial.print("num ");Serial.print(num);
  Serial.print(" pos ");Serial.println(pos);
  switch(pos
  
  ){
    case 0:
      Serial.print(positions[num][0]);
      Serial.println("t");
      break;
    case 1:
      Serial.print(positions[num][0]);
      Serial.println("d");
      break;
    case 2:
      Serial.print(positions[num][0]);
      Serial.println("s");
      break;
    case 3:
      switch(num){
        case 0:
          Serial.println("0ib");
          break;
        case 1:
          Serial.println("0ob");
          break;
        default:
          break;
      }
      break;
    case 4:
      Serial.print(positions[num][1]);
      Serial.println("s");
      break;
    case 5:
      Serial.print(positions[num][1]);
      Serial.println("d");
      break;
    case 6:
      Serial.print(positions[num][1]);
      Serial.println("t");
      break;
    default:
      break;
  }
}
