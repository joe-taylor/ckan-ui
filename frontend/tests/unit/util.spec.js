import { expect } from 'chai';
import { getUserRoleForDataset, getDatasetState } from '@/lib/util';

const STATES = ["draft", "pending publish", "published", "pending archive", "archived"];
const ROLES = ["sysadmin", "admin", "editor", "logged in with no role", "public"];

const ORGS = [

  {
    id: "id-foo",
    name: "foo"
  },

  {
    id: "id-a-org",
    name: "a-org",

    children: [

      { id: "id-a-org-child-1", name: "a-org-child-1" },
      { id: "id-a-org-child-2", name: "a-org-child-2" }

    ]
  }

];


describe("lib/util test", () => {

  describe("ORGS", () => {

    function getProp(orgList, prop) {
      if (!orgList) return [];
      return orgList.flatMap(org => [org[prop], ...getProp(org.children, prop)]);
    }

    it("all org ids should be unique", () => {

      let ids = getProp(ORGS, "id");

      expect(ids).to.have.length((new Set(ids)).size);

    });

    it("all org names should be unique", () => {

      let names = getProp(ORGS, "name");

      expect(names).to.have.length((new Set(names)).size);

    });    
  });

});


describe('lib/util', () => {

  describe('getUserRoleForDataset', () => {

    it('should be a function', () => {
      expect(getUserRoleForDataset).to.be.a('function');
    });


    it('should identify roles correctly with simple input', () => {

      let role;

      role = getUserRoleForDataset(
        // dataset
        { owner_org: "id-foo" },

        // user
        {
          loggedIn: true,
          sysAdmin: false,

          userPermissions: {
            "foo": "editor"
          }
        },

        // org list
        ORGS
      );


      expect(role).to.equal("editor");


      role = getUserRoleForDataset(
        // dataset
        { owner_org: "id-asdfsf" /* <- not in list */ },

        // user
        {
          loggedIn: true,
          sysAdmin: false,

          userPermissions: {
            "foo": "editor"
          }
        },

        // org list
        ORGS
      );


      expect(role).to.equal("logged in with no role");


      role = getUserRoleForDataset(
        // dataset
        { owner_org: "id-foo" },

        // user
        { loggedIn: false },

        // org list
        ORGS
      );


      expect(role).to.equal("public");



      role = getUserRoleForDataset(
        // dataset
        { owner_org: "id-a-org-child-1" },

        // user
        {
          loggedIn: true,
          sysAdmin: false,

          userPermissions: {
            "a-org": "admin"
          }
        },

        // org list
        ORGS
      );


      expect(role).to.equal("admin");
    });

  });


  describe('getDatasetState', () => {

    it('should be a function', () => {
      expect(getDatasetState).to.be.a('function');
    });

    it('should correctly identify state for valid inputs', () => {

      [
        [
          {
            publish_state: "DRAFT"
          },
          "draft"
        ],

        [
          {
            publish_state: "PENDING ARCHIVE"
          },
          "pending archive"
        ],

        [
          {
            publish_state: "PUBLISHED"
          },
          "published"
        ]
      ].forEach(([record, correctResult]) => {
        expect(getDatasetState(record)).to.equal(correctResult);
      })

    });

    it("should throw an error for invalid input", () => {

        [{}, null, { publish_state: "FOO" }].forEach(invalidInput => {
          expect(() => getDatasetState(invalidInput)).to.throw();
        });

    });

  });

});