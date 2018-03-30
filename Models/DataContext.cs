using CoreReactRedux.Models.ModelsView;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CoreReactRedux.Models
{
    public class DataBaseContext: DbContext
    {
        static private object lockObj = new object();

        public DataBaseContext(DbContextOptions<DataBaseContext> options) : base(options) { }

        public DbSet<DataClassParent> DataClassParentTable { get; set; }
        public DbSet<DataClassChild> DataClassChildTable { get; set; }

        public async Task<List<DataClassParent>> GetAllParents()
        {
            var result = from p in DataClassParentTable
                         select p;

            return await result.ToListAsync();
        }

        public async Task<List<DataClassChild>> GetAllChildrens(int parentId)
        {
            var result = from p in DataClassParentTable
                         join c in DataClassChildTable on p.ParentId equals c.ParentId
                         where p.ParentId == parentId
                         select c;

            return await result.ToListAsync();
        }

        public async Task<bool> AddParent(DataClassParentView data)
        {
            await DataClassParentTable.AddAsync(new DataClassParent(data));

            var count = await SaveChangesAsync();

            return count > 0 ? true : false;
        }
    }

    public class DataClassParent: DataClassParentView
    {
        public DataClassParent() { DataClassChildList = new List<DataClassChild>(); }
        public DataClassParent(DataClassParentView data) : base()
        {
            Data = data.Data;
        }
        //children
        public ICollection<DataClassChild> DataClassChildList { get; set; }
    }
    public class DataClassChild: DataClassChildView
    {
        [ForeignKey(nameof(DataClassParent))]
        public int ParentId { get; set; }

        //parent
        public DataClassParent DataClassParent { get; set; }
    }
}
