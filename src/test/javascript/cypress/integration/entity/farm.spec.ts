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

describe('Farm e2e test', () => {
  const farmPageUrl = '/farm';
  const farmPageUrlPattern = new RegExp('/farm(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const farmSample = {};

  let farm: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/farms+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/farms').as('postEntityRequest');
    cy.intercept('DELETE', '/api/farms/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (farm) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/farms/${farm.id}`,
      }).then(() => {
        farm = undefined;
      });
    }
  });

  it('Farms menu should load Farms page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('farm');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Farm').should('exist');
    cy.url().should('match', farmPageUrlPattern);
  });

  describe('Farm page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(farmPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Farm page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/farm/new$'));
        cy.getEntityCreateUpdateHeading('Farm');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', farmPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/farms',
          body: farmSample,
        }).then(({ body }) => {
          farm = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/farms+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [farm],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(farmPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Farm page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('farm');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', farmPageUrlPattern);
      });

      it('edit button click should load edit Farm page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Farm');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', farmPageUrlPattern);
      });

      it('last delete button click should delete instance of Farm', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('farm').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', farmPageUrlPattern);

        farm = undefined;
      });
    });
  });

  describe('new Farm page', () => {
    beforeEach(() => {
      cy.visit(`${farmPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Farm');
    });

    it('should create an instance of Farm', () => {
      cy.get(`[data-cy="farmID"]`)
        .type('ac020fef-fa78-4cff-9b16-d00b19f27f56')
        .invoke('val')
        .should('match', new RegExp('ac020fef-fa78-4cff-9b16-d00b19f27f56'));

      cy.get(`[data-cy="pformID"]`)
        .type('ce568a4c-f5d2-4dd6-a6a7-2899cf0f2b0f')
        .invoke('val')
        .should('match', new RegExp('ce568a4c-f5d2-4dd6-a6a7-2899cf0f2b0f'));

      cy.get(`[data-cy="farmName"]`).type('multi-byte').should('have.value', 'multi-byte');

      cy.get(`[data-cy="farmType"]`).select('PFAL');

      cy.get(`[data-cy="farmSubType"]`).select('CEA_PF_60000P');

      cy.get(`[data-cy="farmDescription"]`).type('Steel').should('have.value', 'Steel');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        farm = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', farmPageUrlPattern);
    });
  });
});
