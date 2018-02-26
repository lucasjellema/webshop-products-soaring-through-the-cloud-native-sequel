define(
    ['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojlistview', 'ojs/ojarraydataprovider'
    ],
    function (oj, ko, $) {
        'use strict';
        function CatalogModel() {
            var self = this;

            self.productData = [{ name: 'Stroopwafels', version: '10.3.6', nodes: 2, cpu: 2, type: 'Java Cloud Service Virtual Image', balancer: 1, memory: 8 },
            { name: 'Klompen', version: '10.3.6', nodes: 2, cpu: 2, type: 'Java Cloud Service Virtual Image', balancer: 1, memory: 8 },
            { name: 'Mini-Molentjes', version: '10.3.6', nodes: 2, cpu: 2, type: 'Java Cloud Service Virtual Image', balancer: 1, memory: 8 },
            { name: 'Delfts Blauw Spul', version: '10.3.6', nodes: 2, cpu: 2, type: 'Java Cloud Service Virtual Image', balancer: 1, memory: 8 },
            { name: 'Drop', version: '10.3.6', nodes: 2, cpu: 2, type: 'Java Cloud Service Virtual Image', balancer: 1, memory: 8 }
            ];
            self.dataProvider = new oj.ArrayDataProvider(self.productData,
                {
                    keys: self.productData.map(function (value) {
                        return value.name;
                    })
                });

            // this function will communicate an event with the parent window
            // typically used for applications that run inside an IFRAME to inform the
            // embedding application about what is going on.      
            self.callParent = function (message) {
                console.log('send message from Catalog to parent window');
                // here we can restrict which parent page can receive our message
                // by specifying the origin that this page should have
                var targetOrigin = '*';
                parent.postMessage(message, targetOrigin);

            }
            self.handleSelectionChanged = function (event) {
                // Access selected elements via ui.items
                var selectedProduct = event.detail.value;
                console.log("selected product " + selectedProduct);
                
                var productSelectionEvent = {
                    "eventType": "productSelectionEvent"
                    , "payload": {
                        "nameSelectedProduct": selectedProduct
                    }
                }
                self.callParent(productSelectionEvent)
            }

            self.username = ko.observable("");
            self.init = function () {
                // listener for events posted on the window;
                // used for applications running insidean IFRAME to receive events from the
                // embedding application
                window.addEventListener("message", function (event) {
                  console.log("Received message from embedding application " + event);
                  console.log("Payload =  " + JSON.stringify(event.data));
                  if (event.data.eventType =="globalContext") {
                      var un = event.data.payload.globalContext.userName;
                      self.username(un)
                  }
                },
                  false);
                  self.callParent({"childHasLoaded":true})
              }
              $(document).ready(function () { self.init(); })

        }

        return new CatalogModel();
    }
);
