//前端交付增、删、改语句----- 
this.$apollo
  .mutate({ 
    mutation: gql` 
      mutation(  
        $IndiSocialId:String      
        $IndiOwnerId:String      $IndiAttributesClassId:String      $IndiAttributesId:String      $IndiAttributesName:String      $IndiAttributeArray:String      $IndiAttributeIf:String     
         ) {  
          GoodInvoiceDetailWrite(  IndiSocialId:$IndiSocialId     IndiOwnerId:$IndiOwnerId     IndiAttributesClassId:$IndiAttributesClassId     IndiAttributesId:$IndiAttributesId     IndiAttributesName:$IndiAttributesName     IndiAttributeArray:$IndiAttributeArray     IndiAttributeIf:$IndiAttributeIf       
          )}`,
           variables: { 
             IndiSocialId: this.IndiSocialId,   /*(1)行业id(行业id) */   
             IndiOwnerId: this.IndiOwnerId,   /*(2)拥有者id */   
             IndiAttributesClassId: this.IndiAttributesClassId,   /*(3)属性分类 */   
             IndiAttributesId: this.IndiAttributesId,   /*(4)属性id */   
             IndiAttributesName: this.IndiAttributesName,   /*(5)属性名称 */   
             IndiAttributeArray: this.IndiAttributeArray,   /*(6)属性排序 */   
             IndiAttributeIf: this.IndiAttributeIf,   /*(7)属性是否可见 */ 
            } 
          })
//前端交付查询语句----- 
this.$apollo
  .mutate({ 
    mutation: gql` 
      query(  
        $IndiSocialId:String      
        $IndiOwnerId:String      $IndiAttributesClassId:String      $IndiAttributesId:String      $IndiAttributesName:String      $IndiAttributeArray:String      $IndiAttributeIf:String      
        ) {  
          GoodInvoiceDetailWrite(  IndiSocialId:$IndiSocialId     IndiOwnerId:$IndiOwnerId     IndiAttributesClassId:$IndiAttributesClassId     IndiAttributesId:$IndiAttributesId     IndiAttributesName:$IndiAttributesName     IndiAttributeArray:$IndiAttributeArray     IndiAttributeIf:$IndiAttributeIf       
          ){  
            IndiSocialId     
            IndiOwnerId     
            IndiAttributesClassId     
            IndiAttributesId     
            IndiAttributesName     
            IndiAttributeArray     
            IndiAttributeIf    
            }}`, 
            variables: { 
              IndiSocialId: this.IndiSocialId,   /*(1)行业id(行业id) */   
              IndiOwnerId: this.IndiOwnerId,   /*(2)拥有者id */   
              IndiAttributesClassId: this.IndiAttributesClassId,   /*(3)属性分类 */  
               IndiAttributesId: this.IndiAttributesId,   /*(4)属性id */   
               IndiAttributesName: this.IndiAttributesName,   /*(5)属性名称 */   IndiAttri