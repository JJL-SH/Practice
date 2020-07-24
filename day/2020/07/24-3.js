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
var openAcCommand = {
  execute: function () {
    console.log("open ac");
  },
};
var openTvCommand = {
  execute: function () {
    console.log("open tv");
  },
};
var openSoundCommand = {
  execute: function () {
    console.log("open sound");
  },
};
var macroCommand1 = MacroCommand();
macroCommand1.add(openTvCommand);
macroCommand1.add(openSoundCommand);

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

var macroCommand2 = MacroCommand();
macroCommand2.add(closeDoorCommand);
macroCommand2.add(openPcCommand);
macroCommand2.add(openQQCommand);

var macroCommand = MacroCommand();
macroCommand.add(openAcCommand);
macroCommand.add(macroCommand1);
macroCommand.add(macroCommand2);

macroCommand.execute();
