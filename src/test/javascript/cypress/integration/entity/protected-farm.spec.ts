import { entityItemSelector } from '../../support/commands';
import {
  entityTableSelector,
  entityDetailsButtonSelector,
  entityDetailsBackButtonSelector,
  entityCreateButtonSelector,
  entityCreateSaveButtonSelector,
  entityCreateCancelButtonSelector,
  entityEditButtonSelector,
  entityDeleteButtonSelector,
  entityConfirmDeleteButtonSelector,
} from '../../support/entity';

describe('ProtectedFarm e2e test', () => {
  const protectedFarmPageUrl = '/protected-farm';
  const protectedFarmPageUrlPattern = new RegExp('/protected-farm(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const protectedFarmSample = {};

  let protectedFarm: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/protected-farms+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/protected-farms').as('postEntityRequest');
    cy.intercept('DELETE', '/api/protected-farms/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (protectedFarm) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/protected-farms/${protectedFarm.id}`,
      }).then(() => {
        protectedFarm = undefined;
      });
    }
  });

  it('ProtectedFarms menu should load ProtectedFarms page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('protected-farm');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('ProtectedFarm').should('exist');
    cy.url().should('match', protectedFarmPageUrlPattern);
  });

  describe('ProtectedFarm page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(protectedFarmPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create ProtectedFarm page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/protected-farm/new$'));
        cy.getEntityCreateUpdateHeading('ProtectedFarm');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', protectedFarmPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/protected-farms',
          body: protectedFarmSample,
        }).then(({ body }) => {
          protectedFarm = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/protected-farms+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [protectedFarm],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(protectedFarmPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details ProtectedFarm page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('protectedFarm');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', protectedFarmPageUrlPattern);
      });

      it('edit button click should load edit ProtectedFarm page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('ProtectedFarm');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', protectedFarmPageUrlPattern);
      });

      it('last delete button click should delete instance of ProtectedFarm', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('protectedFarm').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', protectedFarmPageUrlPattern);

        protectedFarm = undefined;
      });
    });
  });

  describe('new ProtectedFarm page', () => {
    beforeEach(() => {
      cy.visit(`${protectedFarmPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('ProtectedFarm');
    });

    it('should create an instance of ProtectedFarm', () => {
      cy.get(`[data-cy="protectedFarmID"]`)
        .type('c2088eaf-43d5-46b8-ae36-f5f953a3321a')
        .invoke('val')
        .should('match', new RegExp('c2088eaf-43d5-46b8-ae36-f5f953a3321a'));

      cy.get(`[data-cy="protectedFarmName"]`).type('array Virtual').should('have.value', 'array Virtual');

      cy.get(`[data-cy="protectedFarmType"]`).select('PFAL_Protected');

      cy.get(`[data-cy="protectedFarmSubType"]`).select('Nano');

      cy.get(`[data-cy="protectedFarmDescription"]`).type('Program Orchestrator').should('have.value', 'Program Orchestrator');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        protectedFarm = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', protectedFarmPageUrlPattern);
    });
  });
});
