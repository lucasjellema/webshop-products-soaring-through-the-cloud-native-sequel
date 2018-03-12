/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your application specific code will go here
 */
define(['ojs/ojcore', 'knockout', 'ojs/ojknockout'],
  function (oj, ko) {
    function ControllerViewModel() {
      var self = this;
      self.globalContext = {}

      self.globalContextListeners = [];
      self.registerGlobalContextListener = function (listener) {
        console.log("New global context listener is registered")
        self.globalContextListeners.push(listener)
      }

      // Media queries for repsonsive layouts
      var smQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
      self.smScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);

      // Header
      // Application Name used in Branding Area
      self.appName = ko.observable("Product Catalog");

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


      self.init = function () {
        // listener for events posted on the window;
        // used for applications running insidean IFRAME to receive events from the
        // embedding application
        window.addEventListener("message", function (event) {
          console.log("Received message from embedding application " + event);
          console.log("Payload =  " + JSON.stringify(event.data));
          if (event.data.eventType == "globalContext") {
            self.globalContext = event.data.payload.globalContext
            //inform listeners of new global context
            console.log("Inform all listeners about the globalContext")
            self.globalContextListeners.forEach(function (listener) { listener(self.globalContext) })
          }
        },
          false);
        self.callParent({ "childHasLoaded": true })
      }
      $(document).ready(function () { self.init(); })


    }

    return new ControllerViewModel();
  }
);
