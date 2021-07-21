import $ from "jquery";

require("jstree");

export default function jstree_prototypes(): void {
  $(function () {
    void $.ajax({
      async: false,
      type: "GET",
      url: "cfa-taxonomy3.json",
      dataType: "json",
      success: function (json) {
        createJSTree(json);
      },

      error: function (xhr, ajaxOptions, thrownError) {
        alert(xhr.status);
        alert(thrownError);
      },
    });
  });

  function createJSTree(jsondata: any) {
    $("#SimpleJSTree").jstree({
      core: {
        data: jsondata,
      },
      plugins: ["dnd", "contextmenu"],
      // "check_callback": true,
      check_callback: function (
        operation: any,
        node: any,
        node_parent: any,
        node_position: any,
        more: any
      ) {
        if (operation === "move_node") {
          console.log("move");
        }
      },
    });
  }

  $("#demo2").jstree({
    core: {
      data: {
        url: "cfa-taxonomy3.json",
        // 'data': function (node) {
        //     return {'id': node.id};
        // }
      },
    },
    plugins: ["dnd", "contextmenu"],
    rules: {
      multitree: true,
      draggable: "all",
    },
  });

  void $.getJSON("cfa-taxonomy3.json", function (data) {
    //alert(data);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    $("#folder_jstree")
      .jstree({
        core: {
          data: data,
        },
        plugins: ["search", "dnd", "contextmenu"],
        search: {
          case_sensitive: false,
          show_only_matches: true,
        },
        //"animation": 0,
        //"check_callback": true,
        /*
                                    rules : {
                                        multitree : true,
                                        draggable : "all"
                                    },
                                    */

        /*
                                    "dnd" : {
                                        "drop_finish" : function () {
                                            console.log("DROP");
                                        },
                                        "drag_check" : function (data) {
                                            console.log("drag_check");
                                            //if(data.r.attr("id") == "phtml_1") {
                                            //	return false;
                                            //}
                                            return {
                                                after : true,
                                                before : true,
                                                inside : true
                                            };
                                        },
                                        "drag_finish" : function (data) {
                                            console.log("DRAG OK");
                                        }
                                    },
                                    */

        crrm: {
          move: {
            check_move: function (m: any) {
              alert("move");
              return true;
              /*
                                                                  var p = this._get_parent(m.o);
                                                                  if(!p) return false;
                                                                  p = p == -1 ? this.get_container() : p;
                                                                  if(p === m.np) return true;
                                                                  if(p[0] && m.np[0] && p[0] === m.np[0]) return true;
                                                                  return false;
                                                                  */
            },
          },
        },
      })
      .bind(
        "move_node.jstree",
        function (e: any, data: { node: { id: string }; parent: string }) {
          console.log("Drop node " + data.node.id + " to " + data.parent);
        }
      )
      .bind(
        "move_node.jstree",
        function (e: any, data: { node: { id: string }; parent: string }) {
          console.log("Drop node " + data.node.id + " to " + data.parent);
        }
      )
      .on(
        "move_node.jstree",
        function (
          e: any,
          data: {
            node: { id: any };
            parent: any;
            position: any;
            instance: { refresh: () => void };
          }
        ) {
          void $.get("?operation=move_node", {
            id: data.node.id,
            parent: data.parent,
            position: data.position,
          }).fail(function () {
            data.instance.refresh();
          });
        }
      );

    /*
                    $(document).bind("dnd_start.vakata", function(e, data) {
                        console.log("Start dnd");
                        // I can see these events
                    })
                    .bind("dnd_move.vakata", function(e, data) {
                        console.log("Move dnd");
                    })
                    .bind("dnd_stop.vakata", function(e, data) {
                        console.log("Stop dnd");
                    });
                    */

    $("#folder_jstree").on("select_node.jstree", function (e, data) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      data.instance.toggle_node(data.selected);
    });
  });

  $("#tree").jstree({
    core: {
      animation: 0,
      check_callback: true,
      data: [
        {
          id: "ajson1",
          parent: "#",
          text: "Simple root node",
        },
        {
          id: "ajson11",
          parent: "#",
          text: "Simple root 1 node",
        },
        {
          id: "ajson12",
          parent: "#",
          text: "Simple root 2 node",
        },
        {
          id: "ajson2",
          parent: "#",
          text: "Root node 2",
        },
        {
          id: "ajson3",
          parent: "ajson2",
          text: "Child 1",
          type: "file",
        },
        {
          id: "ajson4",
          parent: "ajson2",
          text: "Child 2",
          type: "file",
        },
      ],
    },
    /*
                    "types": {
                      "#": {
                        "max_children": 1,
                        "max_depth": 4,
                        "valid_children": ["root"]
                      },
                      "root": {
                        "icon": "/static/3.1.1/assets/images/tree_icon.png",
                        "valid_children": ["default"]
                      },
                      "default": {
                        "valid_children": ["default", "file"]
                      },
                      "file": {
                        "icon": "glyphicon glyphicon-file",
                        "valid_children": []
                      }
                    },
                    */
    plugins: ["contextmenu", "dnd", "types"],
  });

  //var Parent = 0;
  //var newParent = 0;
  //var Pos = 0;
  //var newPos = 0;
  /*
          $(document).on('dnd_start.vakata', function (event, data
          ) {
          sel = "li#" + data.data.nodes[0] + ".jstree-node";
          Parent = $('#tree').jstree(true).get_node(data.data.nodes[0]).parent;
          Pos = $(sel).index();
          })
          ;

          $(document).on('dnd_stop.vakata', function (event, data
          ) {
          node = data.data.origin.get_node(data.data.nodes[0]);
          if (node.type == "root") {
          return false;
          }

          if (confirm("Voulez vous vraiment deplacer le fichier ou le dossier ?") === false) {
          $('#tree').jstree(true).move_node(node, Parent, Pos);
          return false;
          }
          sel = "li#" + data.data.nodes[0] + ".jstree-node";
          newPos = $(sel).index();
          newParent = node.parent;
          })
          ;
          */

  /*
          $('#tree4').jstree({
          "core": {
          "animation": 0,
          "check_callback": true,
          "data": ""
          },
          "plugins": ["contextmenu", "dnd", "types"]
          })
          ;
          */

  /*
          $.getJSON("cfa-taxonomy3.json", function ( data ) {
          //alert(data);
          let config = {
          'core': {
          'data': data
          },
          "plugins": ["contextmenu", "dnd"],
          "dnd": {
          "large_drop_target": "true"
          }
          };
          console.log(config);
          $('#tree4').jstree(config);
          })
          ;
          */

  fetch("cfa-taxonomy3.json")
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      $("#tree3").jstree({
        core: {
          animation: 0,
          check_callback: true,
          data: [
            {
              text: "#helpfulness #crowdhelping",
              num_of_projects: 1,
              children: [
                {
                  project_id: 3566,
                  text: "crowdhelping_website",
                  description: null,
                  code_url: null,
                },
              ],
            },
            {
              text: "100daysofcode",
              num_of_projects: 2,
              children: [
                {
                  project_id: 6395,
                  text: "EugPassGen",
                  description:
                    "A passphrase Generator with Eugene Oregon Flavor",
                  code_url: "https://github.com/OpenEugene/EugPassGen",
                },
                {
                  project_id: 6399,
                  text: "hyph",
                  description: "connective tissue for communities of practice",
                  code_url: "https://github.com/OpenEugene/hyph",
                },
              ],
            },
            {
              text: "10x-data-federation",
              num_of_projects: 1,
              children: [
                {
                  project_id: 29,
                  text: "couch-rules-engine",
                  description:
                    "A prototype effort to look at using CouchDB as a rules engine",
                  code_url: "https://github.com/18F/couch-rules-engine",
                },
              ],
            },
            {
              text: "18f",
              num_of_projects: 1,
              children: [
                {
                  project_id: 9,
                  text: "all_sorns",
                  description: "Repo for SORN DASH",
                  code_url: "https://github.com/18F/all_sorns",
                },
              ],
            },
            {
              text: "2015",
              num_of_projects: 2,
              children: [
                {
                  project_id: 6188,
                  text: "kirwan",
                  description:
                    "In Franklin County, there is a nearly twenty-year difference in life expectancy for seniors living in different neighborhoods. ",
                  code_url: "https://github.com/SCODEMeetup/kirwan",
                },
                {
                  project_id: 3673,
                  text: "philly_election_live_results",
                  description:
                    "Tim Wisniewski wrote an election scraper with Kimono and a html page to display live election results scraped from http://phillyelectionresults.com/.",
                  code_url: "http://git.kclough.me/kclough/nodeelectionscraper",
                },
              ],
            },
            {
              text: "2gitlab",
              num_of_projects: 1,
              children: [
                {
                  project_id: 2523,
                  text: "Wir-bauen-Hamburg.de",
                  description:
                    "Eine Stadtplanungs- und BÃ¼rgerbeteiligungsplattform fÃ¼r alle StÃ¤dte",
                  code_url: "https://github.com/webuildcity/polis",
                },
                {
                  project_id: 3698,
                  text: "Something in Philly",
                  description:
                    "Tim Wisniewski wrote an election scraper with Kimono and a html page to display live election results scraped from http://phillyelectionresults.com/.",
                  code_url: "http://git.kclough.me/kclough/nodeelectionscraper",
                },
                {
                  project_id: 3699,
                  text: "philly_traffic",
                  description:
                    "Tim Wisniewski wrote an election scraper with Kimono and a html page to display live election results scraped from http://phillyelectionresults.com/.",
                  code_url: "http://git.kclough.me/kclough/nodeelectionscraper",
                },
              ],
            },
          ],
        },
        plugins: ["contextmenu", "dnd", "types"],
      });
      $("#tree4").jstree({
        core: {
          animation: 0,
          check_callback: true,
          data: result,
        },
        plugins: ["contextmenu", "dnd", "types"],
      });

      $("#tree5").jstree({
        core: {
          animation: 0,
          check_callback: true,
          data: result,
        },
        plugins: ["contextmenu", "dnd", "types"],
      });
    })
    .catch((error) => console.log(error));

  $(document).ready(function () {
    $(".search-input").keyup(function () {
      const searchString = $(this).val();
      $("#folder_jstree").jstree("search", searchString);
    });
  });
}
