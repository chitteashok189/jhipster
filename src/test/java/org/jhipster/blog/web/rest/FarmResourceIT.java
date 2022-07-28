package org.jhipster.blog.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.List;
import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.jhipster.blog.IntegrationTest;
import org.jhipster.blog.domain.Farm;
import org.jhipster.blog.domain.enumeration.FarmType;
import org.jhipster.blog.domain.enumeration.SubType;
import org.jhipster.blog.repository.FarmRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link FarmResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class FarmResourceIT {

    private static final UUID DEFAULT_FARM_ID = UUID.randomUUID();
    private static final UUID UPDATED_FARM_ID = UUID.randomUUID();

    private static final UUID DEFAULT_PFORM_ID = UUID.randomUUID();
    private static final UUID UPDATED_PFORM_ID = UUID.randomUUID();

    private static final String DEFAULT_FARM_NAME = "AAAAAAAAAA";
    private static final String UPDATED_FARM_NAME = "BBBBBBBBBB";

    private static final FarmType DEFAULT_FARM_TYPE = FarmType.PFAL;
    private static final FarmType UPDATED_FARM_TYPE = FarmType.PFNL;

    private static final SubType DEFAULT_FARM_SUB_TYPE = SubType.Pico;
    private static final SubType UPDATED_FARM_SUB_TYPE = SubType.CEA_PF_1250P;

    private static final String DEFAULT_FARM_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_FARM_DESCRIPTION = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/farms";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private FarmRepository farmRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restFarmMockMvc;

    private Farm farm;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Farm createEntity(EntityManager em) {
        Farm farm = new Farm()
            .farmID(DEFAULT_FARM_ID)
            .pformID(DEFAULT_PFORM_ID)
            .farmName(DEFAULT_FARM_NAME)
            .farmType(DEFAULT_FARM_TYPE)
            .farmSubType(DEFAULT_FARM_SUB_TYPE)
            .farmDescription(DEFAULT_FARM_DESCRIPTION);
        return farm;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Farm createUpdatedEntity(EntityManager em) {
        Farm farm = new Farm()
            .farmID(UPDATED_FARM_ID)
            .pformID(UPDATED_PFORM_ID)
            .farmName(UPDATED_FARM_NAME)
            .farmType(UPDATED_FARM_TYPE)
            .farmSubType(UPDATED_FARM_SUB_TYPE)
            .farmDescription(UPDATED_FARM_DESCRIPTION);
        return farm;
    }

    @BeforeEach
    public void initTest() {
        farm = createEntity(em);
    }

    @Test
    @Transactional
    void createFarm() throws Exception {
        int databaseSizeBeforeCreate = farmRepository.findAll().size();
        // Create the Farm
        restFarmMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(farm)))
            .andExpect(status().isCreated());

        // Validate the Farm in the database
        List<Farm> farmList = farmRepository.findAll();
        assertThat(farmList).hasSize(databaseSizeBeforeCreate + 1);
        Farm testFarm = farmList.get(farmList.size() - 1);
        assertThat(testFarm.getFarmID()).isEqualTo(DEFAULT_FARM_ID);
        assertThat(testFarm.getPformID()).isEqualTo(DEFAULT_PFORM_ID);
        assertThat(testFarm.getFarmName()).isEqualTo(DEFAULT_FARM_NAME);
        assertThat(testFarm.getFarmType()).isEqualTo(DEFAULT_FARM_TYPE);
        assertThat(testFarm.getFarmSubType()).isEqualTo(DEFAULT_FARM_SUB_TYPE);
        assertThat(testFarm.getFarmDescription()).isEqualTo(DEFAULT_FARM_DESCRIPTION);
    }

    @Test
    @Transactional
    void createFarmWithExistingId() throws Exception {
        // Create the Farm with an existing ID
        farm.setId(1L);

        int databaseSizeBeforeCreate = farmRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restFarmMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(farm)))
            .andExpect(status().isBadRequest());

        // Validate the Farm in the database
        List<Farm> farmList = farmRepository.findAll();
        assertThat(farmList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllFarms() throws Exception {
        // Initialize the database
        farmRepository.saveAndFlush(farm);

        // Get all the farmList
        restFarmMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(farm.getId().intValue())))
            .andExpect(jsonPath("$.[*].farmID").value(hasItem(DEFAULT_FARM_ID.toString())))
            .andExpect(jsonPath("$.[*].pformID").value(hasItem(DEFAULT_PFORM_ID.toString())))
            .andExpect(jsonPath("$.[*].farmName").value(hasItem(DEFAULT_FARM_NAME)))
            .andExpect(jsonPath("$.[*].farmType").value(hasItem(DEFAULT_FARM_TYPE.toString())))
            .andExpect(jsonPath("$.[*].farmSubType").value(hasItem(DEFAULT_FARM_SUB_TYPE.toString())))
            .andExpect(jsonPath("$.[*].farmDescription").value(hasItem(DEFAULT_FARM_DESCRIPTION)));
    }

    @Test
    @Transactional
    void getFarm() throws Exception {
        // Initialize the database
        farmRepository.saveAndFlush(farm);

        // Get the farm
        restFarmMockMvc
            .perform(get(ENTITY_API_URL_ID, farm.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(farm.getId().intValue()))
            .andExpect(jsonPath("$.farmID").value(DEFAULT_FARM_ID.toString()))
            .andExpect(jsonPath("$.pformID").value(DEFAULT_PFORM_ID.toString()))
            .andExpect(jsonPath("$.farmName").value(DEFAULT_FARM_NAME))
            .andExpect(jsonPath("$.farmType").value(DEFAULT_FARM_TYPE.toString()))
            .andExpect(jsonPath("$.farmSubType").value(DEFAULT_FARM_SUB_TYPE.toString()))
            .andExpect(jsonPath("$.farmDescription").value(DEFAULT_FARM_DESCRIPTION));
    }

    @Test
    @Transactional
    void getNonExistingFarm() throws Exception {
        // Get the farm
        restFarmMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewFarm() throws Exception {
        // Initialize the database
        farmRepository.saveAndFlush(farm);

        int databaseSizeBeforeUpdate = farmRepository.findAll().size();

        // Update the farm
        Farm updatedFarm = farmRepository.findById(farm.getId()).get();
        // Disconnect from session so that the updates on updatedFarm are not directly saved in db
        em.detach(updatedFarm);
        updatedFarm
            .farmID(UPDATED_FARM_ID)
            .pformID(UPDATED_PFORM_ID)
            .farmName(UPDATED_FARM_NAME)
            .farmType(UPDATED_FARM_TYPE)
            .farmSubType(UPDATED_FARM_SUB_TYPE)
            .farmDescription(UPDATED_FARM_DESCRIPTION);

        restFarmMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedFarm.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedFarm))
            )
            .andExpect(status().isOk());

        // Validate the Farm in the database
        List<Farm> farmList = farmRepository.findAll();
        assertThat(farmList).hasSize(databaseSizeBeforeUpdate);
        Farm testFarm = farmList.get(farmList.size() - 1);
        assertThat(testFarm.getFarmID()).isEqualTo(UPDATED_FARM_ID);
        assertThat(testFarm.getPformID()).isEqualTo(UPDATED_PFORM_ID);
        assertThat(testFarm.getFarmName()).isEqualTo(UPDATED_FARM_NAME);
        assertThat(testFarm.getFarmType()).isEqualTo(UPDATED_FARM_TYPE);
        assertThat(testFarm.getFarmSubType()).isEqualTo(UPDATED_FARM_SUB_TYPE);
        assertThat(testFarm.getFarmDescription()).isEqualTo(UPDATED_FARM_DESCRIPTION);
    }

    @Test
    @Transactional
    void putNonExistingFarm() throws Exception {
        int databaseSizeBeforeUpdate = farmRepository.findAll().size();
        farm.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFarmMockMvc
            .perform(
                put(ENTITY_API_URL_ID, farm.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(farm))
            )
            .andExpect(status().isBadRequest());

        // Validate the Farm in the database
        List<Farm> farmList = farmRepository.findAll();
        assertThat(farmList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchFarm() throws Exception {
        int databaseSizeBeforeUpdate = farmRepository.findAll().size();
        farm.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFarmMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(farm))
            )
            .andExpect(status().isBadRequest());

        // Validate the Farm in the database
        List<Farm> farmList = farmRepository.findAll();
        assertThat(farmList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamFarm() throws Exception {
        int databaseSizeBeforeUpdate = farmRepository.findAll().size();
        farm.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFarmMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(farm)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Farm in the database
        List<Farm> farmList = farmRepository.findAll();
        assertThat(farmList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateFarmWithPatch() throws Exception {
        // Initialize the database
        farmRepository.saveAndFlush(farm);

        int databaseSizeBeforeUpdate = farmRepository.findAll().size();

        // Update the farm using partial update
        Farm partialUpdatedFarm = new Farm();
        partialUpdatedFarm.setId(farm.getId());

        partialUpdatedFarm.pformID(UPDATED_PFORM_ID).farmName(UPDATED_FARM_NAME);

        restFarmMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedFarm.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedFarm))
            )
            .andExpect(status().isOk());

        // Validate the Farm in the database
        List<Farm> farmList = farmRepository.findAll();
        assertThat(farmList).hasSize(databaseSizeBeforeUpdate);
        Farm testFarm = farmList.get(farmList.size() - 1);
        assertThat(testFarm.getFarmID()).isEqualTo(DEFAULT_FARM_ID);
        assertThat(testFarm.getPformID()).isEqualTo(UPDATED_PFORM_ID);
        assertThat(testFarm.getFarmName()).isEqualTo(UPDATED_FARM_NAME);
        assertThat(testFarm.getFarmType()).isEqualTo(DEFAULT_FARM_TYPE);
        assertThat(testFarm.getFarmSubType()).isEqualTo(DEFAULT_FARM_SUB_TYPE);
        assertThat(testFarm.getFarmDescription()).isEqualTo(DEFAULT_FARM_DESCRIPTION);
    }

    @Test
    @Transactional
    void fullUpdateFarmWithPatch() throws Exception {
        // Initialize the database
        farmRepository.saveAndFlush(farm);

        int databaseSizeBeforeUpdate = farmRepository.findAll().size();

        // Update the farm using partial update
        Farm partialUpdatedFarm = new Farm();
        partialUpdatedFarm.setId(farm.getId());

        partialUpdatedFarm
            .farmID(UPDATED_FARM_ID)
            .pformID(UPDATED_PFORM_ID)
            .farmName(UPDATED_FARM_NAME)
            .farmType(UPDATED_FARM_TYPE)
            .farmSubType(UPDATED_FARM_SUB_TYPE)
            .farmDescription(UPDATED_FARM_DESCRIPTION);

        restFarmMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedFarm.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedFarm))
            )
            .andExpect(status().isOk());

        // Validate the Farm in the database
        List<Farm> farmList = farmRepository.findAll();
        assertThat(farmList).hasSize(databaseSizeBeforeUpdate);
        Farm testFarm = farmList.get(farmList.size() - 1);
        assertThat(testFarm.getFarmID()).isEqualTo(UPDATED_FARM_ID);
        assertThat(testFarm.getPformID()).isEqualTo(UPDATED_PFORM_ID);
        assertThat(testFarm.getFarmName()).isEqualTo(UPDATED_FARM_NAME);
        assertThat(testFarm.getFarmType()).isEqualTo(UPDATED_FARM_TYPE);
        assertThat(testFarm.getFarmSubType()).isEqualTo(UPDATED_FARM_SUB_TYPE);
        assertThat(testFarm.getFarmDescription()).isEqualTo(UPDATED_FARM_DESCRIPTION);
    }

    @Test
    @Transactional
    void patchNonExistingFarm() throws Exception {
        int databaseSizeBeforeUpdate = farmRepository.findAll().size();
        farm.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFarmMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, farm.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(farm))
            )
            .andExpect(status().isBadRequest());

        // Validate the Farm in the database
        List<Farm> farmList = farmRepository.findAll();
        assertThat(farmList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchFarm() throws Exception {
        int databaseSizeBeforeUpdate = farmRepository.findAll().size();
        farm.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFarmMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(farm))
            )
            .andExpect(status().isBadRequest());

        // Validate the Farm in the database
        List<Farm> farmList = farmRepository.findAll();
        assertThat(farmList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamFarm() throws Exception {
        int databaseSizeBeforeUpdate = farmRepository.findAll().size();
        farm.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFarmMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(farm)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Farm in the database
        List<Farm> farmList = farmRepository.findAll();
        assertThat(farmList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteFarm() throws Exception {
        // Initialize the database
        farmRepository.saveAndFlush(farm);

        int databaseSizeBeforeDelete = farmRepository.findAll().size();

        // Delete the farm
        restFarmMockMvc
            .perform(delete(ENTITY_API_URL_ID, farm.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Farm> farmList = farmRepository.findAll();
        assertThat(farmList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
