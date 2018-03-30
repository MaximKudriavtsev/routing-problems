using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CoreReactRedux.Models.ModelsView
{
    public class DataClassChildView
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ChildId { get; set; }
        public string Data { get; set; }
    }
}
