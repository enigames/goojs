define([
	'goo/fsmpack/statemachine/actions/Action',
	'goo/fsmpack/statemachine/FsmUtils'
], function (
	Action,
	FsmUtils
) {
	'use strict';

	function KeyPressedAction(/*id, settings*/) {
		Action.apply(this, arguments);
	}

	KeyPressedAction.prototype = Object.create(Action.prototype);
	KeyPressedAction.prototype.constructor = KeyPressedAction;

	KeyPressedAction.external = {
		name: 'Key Pressed',
		type: 'controls',
		description: 'Listens for a key press event and performs a transition. Works over transition boundaries.',
		canTransition: true,
		parameters: [{
			name: 'Key',
			key: 'key',
			type: 'string',
			control: 'key',
			description: 'Key to listen for'
		}],
		transitions: [{
			key: 'keydown',
			name: 'Key pressed',
			description: 'State to transition to when the key is pressed'
		}]
	};

	KeyPressedAction.prototype.configure = function (settings) {
		this.key = settings.key ? FsmUtils.getKey(settings.key) : null;
		this.transitions = { keydown: settings.transitions.keydown };
	};

	KeyPressedAction.prototype.enter = function (fsm) {
		this.eventListenerDown = function (event) {
			if (event.which === +this.key) {
				fsm.send(this.transitions.keydown);
			}
		}.bind(this);
		this.eventListenerUp = function (event) {
			if (event.which === +this.key) {
				document.removeEventListener('keyup', this.eventListenerUp);
			}
		}.bind(this);
		document.addEventListener('keydown', this.eventListenerDown);
		document.addEventListener('keyup', this.eventListenerUp);
	};

	KeyPressedAction.prototype.exit = function () {
		document.removeEventListener('keydown', this.eventListenerDown);
	};

	return KeyPressedAction;
});