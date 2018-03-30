using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace CoreReactRedux.Migrations
{
    public partial class InitMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DataClassParentTable",
                columns: table => new
                {
                    ParentId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Data = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DataClassParentTable", x => x.ParentId);
                });

            migrationBuilder.CreateTable(
                name: "DataClassChildTable",
                columns: table => new
                {
                    ChildId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Data = table.Column<string>(nullable: true),
                    ParentId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DataClassChildTable", x => x.ChildId);
                    table.ForeignKey(
                        name: "FK_DataClassChildTable_DataClassParentTable_ParentId",
                        column: x => x.ParentId,
                        principalTable: "DataClassParentTable",
                        principalColumn: "ParentId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DataClassChildTable_ParentId",
                table: "DataClassChildTable",
                column: "ParentId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DataClassChildTable");

            migrationBuilder.DropTable(
                name: "DataClassParentTable");
        }
    }
}
