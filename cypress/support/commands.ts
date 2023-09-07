import * as commandsCommon from './commands/common';
import * as commandsMain from './commands/main';

Cypress.Commands.addAll(commandsCommon);
Cypress.Commands.addAll(commandsMain);
