﻿// <auto-generated />
using CoreReactRedux.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using System;

namespace CoreReactRedux.Migrations
{
    [DbContext(typeof(DataBaseContext))]
    [Migration("20180331144104_AddOriginToUnit")]
    partial class AddOriginToUnit
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.2-rtm-10011")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("CoreReactRedux.Models.Order", b =>
                {
                    b.Property<int>("OrderId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Cache")
                        .IsRequired();

                    b.HasKey("OrderId");

                    b.ToTable("Orders");
                });

            modelBuilder.Entity("CoreReactRedux.Models.Point", b =>
                {
                    b.Property<int>("PointId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("From")
                        .IsRequired()
                        .HasMaxLength(40);

                    b.Property<int>("OrderId");

                    b.Property<string>("To")
                        .IsRequired()
                        .HasMaxLength(40);

                    b.Property<double>("Volume");

                    b.HasKey("PointId");

                    b.HasIndex("OrderId");

                    b.ToTable("Points");
                });

            modelBuilder.Entity("CoreReactRedux.Models.Unit", b =>
                {
                    b.Property<int>("UnitId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Origin")
                        .IsRequired();

                    b.Property<double>("Volume");

                    b.HasKey("UnitId");

                    b.ToTable("Units");
                });

            modelBuilder.Entity("CoreReactRedux.Models.Point", b =>
                {
                    b.HasOne("CoreReactRedux.Models.Order", "Order")
                        .WithMany("Points")
                        .HasForeignKey("OrderId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
