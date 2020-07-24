var closeDoorCommand = {
  execute: function () {
    console.log("close door");
  },
};
var openPcCommand = {
  execute: function () {
    console.log("open pc");
  },
};
var openQQCommand = {
  execute: function () {
    console.log("open qq");
  },
};

var MacroCommand = function () {
  return {
    commandsList: [],
    add: function (command) {
      this.commandsList.push(command);
    },
    execute: function () {
      this.commandsList.forEach(function (command) {
        command.execute();
      });
    },
  };
};

var macroCommand = new MacroCommand();

macroCommand.add(closeDoorCommand);
macroCommand.add(openPcCommand);
macroCommand.add(openQQCommand);

macroCommand.execute();
