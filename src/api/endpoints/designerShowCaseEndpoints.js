const designerShowCaseEndpoints = {
      getDesignerShowcases: "/designer-showcases",
      getDesignerShowcaseById: (id) => `/designer-showcases/${id}`,
      createDesignerShowcase: "/designer-showcases",
      updateDesignerShowcase: (id) =>`/designer-showcases/${id}`,
      deleteDesignerShowcase: (id) =>`/designer-showcases/${id}`,
    };
    
    export default designerShowCaseEndpoints;