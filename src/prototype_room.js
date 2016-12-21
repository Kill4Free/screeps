'use strict';

Room.prototype.execute = function() {

  try {
    let returnCode = this.handle();
    for (var creep of this.find(FIND_MY_CREEPS)) {
      creep.handle();
    }
    delete this.transferableStructures;
    delete this.droppedResources;
    delete this.constructionSites;
    return returnCode;

  } catch (err) {
    this.log('Executing room failed: ' + this.name + ' ' + err + ' ' + err.stack);
    Game.notify('Executing room failed: ' + this.name + ' ' + err + ' ' + err.stack, 30);
    return false;

  }
};

Room.prototype.handle = function() {
  if (this.controller && this.controller.my) {
    return this.myHandleRoom();
  }
  this.externalHandleRoom();
  return false;
};
