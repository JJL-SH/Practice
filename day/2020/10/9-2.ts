class Car {
  constructor(
    public engine: string,
    public chassis: string,
    public body: string
  ) {}
}
class CarBuilder {
  engine!: string;
  chassis!: string;
  body!: string;
  addChassis(chassis: string) {
    this.chassis = chassis;
    return this;
  }
  addEngine(engine: string) {
    this.engine = engine;
    return this;
  }
  addBody(body: string) {
    this.body = body;
    return this;
  }
  build() {
    return new Car(this.engine, this.chassis, this.body);
  }
}

const car = new CarBuilder()
  .addEngine("v12")
  .addBody("镁合金")
  .addChassis("复合材料")
  .build();
