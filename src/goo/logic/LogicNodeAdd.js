define(
	[
		'goo/logic/LogicLayer',
		'goo/logic/LogicNode',
		'goo/logic/LogicNodes',
		'goo/logic/LogicInterface',
		'goo/math/Vector3'
	],
	/** @lends */
	function(LogicLayer, LogicNode, LogicNodes, LogicInterface, Vector3) {
		"use strict";

		/**
		 * @class Logic node that calculates sine
		 */
		function LogicNodeAdd() {
			LogicNode.call(this);
			this.logicInterface = LogicNodeAdd.logicInterface;
			this.type = "LogicNodeAdd";
		}

		LogicNodeAdd.prototype = Object.create(LogicNode.prototype);
		LogicNodeAdd.editorName = "Add";

		LogicNodeAdd.prototype.onInputChanged = function(instDesc, portID, value) {
			var out = LogicLayer.readPort(instDesc, LogicNodeAdd.inportX) +
				LogicLayer.readPort(instDesc, LogicNodeAdd.inportY);

			LogicLayer.writeValue(this.logicInstance, LogicNodeAdd.outportSum, out);
		}

		LogicNodeAdd.logicInterface = new LogicInterface();
		LogicNodeAdd.outportSum = LogicNodeAdd.logicInterface.addOutputProperty("sum", "float");
		LogicNodeAdd.inportX = LogicNodeAdd.logicInterface.addInputProperty("x", "float", 0);
		LogicNodeAdd.inportY = LogicNodeAdd.logicInterface.addInputProperty("y", "float", 0);

		LogicNodes.registerType("LogicNodeAdd", LogicNodeAdd);

		return LogicNodeAdd;
	});